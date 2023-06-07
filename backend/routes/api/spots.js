const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Booking, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {

    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    page = parseInt(page);
    size = parseInt(size);
    minLat = Number(minLat);
    maxLat = Number(maxLat);
    minLng = Number(minLng);
    maxLng = Number(maxLng);
    minPrice = Number(minPrice);
    maxPrice = Number(maxPrice);

    if(!page) page = 1;
    if(!size || size > 20) size = 20;
    if(page > 10) page = 10;

    const pagination = {};

    if(page >= 1 && size >= 1){
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const errors = {};
    if(isNaN(page) || page < 1 || page > 10){
        errors.page = "Page must be greater than or equal to 1";
    }
    if(isNaN(size) || size < 1 || size > 20){
        errors.size = "Size must be greater than or equal to 1";
    }
    if (minLat && isNaN(minLat)) {
        errors.minLat = "Minimum latitude is invalid";
    }
    if (maxLat && isNaN(maxLat)) {
        errors.maxLat = "Maximum latitude is invalid";
    }
    if (minLng && isNaN(minLng)) {
        errors.minLng = "Minimum longitude is invalid";
    }
    if (maxLng && isNaN(maxLng)) {
        errors.maxLng = "Maximum longitude is invalid";
    }
    if (minPrice && isNaN(minPrice) || minPrice <= 0) {
        errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
    if (maxPrice && isNaN(maxPrice) || maxPrice <= 0) {
        errors.maxPrice = "Maximum price must be greater than or equal to 0";
    }

    if(Object.entries(errors).length !== 0){
        return res.status(400).json({
            message: "Bad Request",
            errors : errors
        });
    }

    const where = {};
    if(minLat){
        where.lat = {[Op.gte]: minLat};
    }
    if (maxLat) {
        where.lat = {[Op.lte]: maxLat};
    }
    if (minLng) {
        where.lng = { [Op.gte]: minLng };
    }
    if (maxLng) {
        where.lng = { [Op.lte]: maxLng };
    }
    if (minPrice) {
        where.price = { [Op.gte]: minPrice };
    }
    if (maxPrice) {
        where.price = { [Op.lte]: maxPrice };
    }

    const allSpots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ],
        where,
        ...pagination
    });

    let Spots = [];
    allSpots.forEach(spot =>{
        Spots.push(spot.toJSON());
    });
    Spots.forEach(spot => {
        let sum = 0;
        spot.Reviews.forEach(review =>{
            sum += review.stars;
        });
        spot.avgRating = sum / spot.Reviews.length;
        delete spot.Reviews;
    });
    Spots.forEach(spot =>{
        spot.SpotImages.forEach(image =>{
            if(image.preview === true){
                spot.previewImage = image.url;
            }
        });
        if(!spot.previewImage){
            spot.previewImage = 'No preview image found';
        }
        delete spot.SpotImages;
        spot.price = Number(spot.price);
        spot.lng = Number(spot.lng);
        spot.lat = Number(spot.lat);
    });

    return res.json({Spots,
        page,
        size
    });
    });

router.get('/current',requireAuth , async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({
    where : {ownerId : user.id},
    include: [
        { model: Review },
        { model: SpotImage }
    ]
    });

    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON());
    });

    Spots.forEach(spot => {
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars;
        });
        spot.avgRating = sum / spot.Reviews.length;
        delete spot.Reviews;
    });
    Spots.forEach(spot => {

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        });
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found';
        }
        delete spot.SpotImages;

        spot.price = Number(spot.price);
        spot.lng = Number(spot.lng);
        spot.lat = Number(spot.lat);
    });

return res.json({ Spots });
});

router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview'],
        },{
            model: User, as: 'Owner',
            attributes:['id', 'firstName', 'lastName']

        },{
            model: Review
        }]
    });
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
        });
    }

    const count = await Review.count({
       where: req.params
    });
     spot.dataValues.numReviews = count;

    let sum = 0;
    spot.Reviews.forEach(review => {
        sum += review.stars;
    });
    spot.dataValues.avgStarRating = sum / spot.dataValues.Reviews.length;
    delete spot.dataValues.Reviews;
    spot.price = Number(spot.price);
    spot.lng = Number(spot.lng);
    spot.lat = Number(spot.lat);

   return res.json(spot);
});

const validateSpot = [
    check ('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check ('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 49 })
        .isLength({ min: 1})
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Price per day is required"),
    handleValidationErrors
]

router.post('/', validateSpot, requireAuth, async (req, res) => {
const {address, city, state, country, lat, lng, name, description, price} = req.body;
   const { user } = req;
    const spot = await Spot.create({
        ownerId: user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    });
    spot.price = Number(spot.price);
    spot.lng = Number(spot.lng);
    spot.lat = Number(spot.lat);

    return res.status(201).json(spot);
});

router.post('/:spotId/images', requireAuth, async(req, res) =>{
   const {url, preview} = req.body;
   const {user} = req;
   const spot = await Spot.findByPk(req.params.spotId);
   if(!spot){
       return res.status(404).json({
           message: "Spot couldn't be found",
       });
   }
   if(spot.ownerId !== user.id){
    return res.status(403).json({
            message: "Forbidden"
        });
   }
   const updatedSpot = await SpotImage.create({
    spotId: spot.id,
    url,
    preview
   });
  const pojo = updatedSpot.toJSON();
  delete pojo.spotId;
  delete pojo.createdAt;
  delete pojo.updatedAt;
  return res.json(pojo);
});

router.put('/:spotId', validateSpot, requireAuth, async (req, res)=>{
    const {user} = req;
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    if(spot.ownerId !== user.id){
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    if(address){
        spot.address = address;
    }
    if (city) {
        spot.city = city;
    }
    if (state) {
        spot.state = state;
    }
    if (country) {
        spot.country = country;
    }
    if (lat) {
        spot.lat = lat;
    }
    if (lng) {
        spot.lng = lng;
    }
    if (name) {
        spot.name = name;
    }
    if (description) {
        spot.description = description;
    }
    if (price) {
        spot.price = price;
    }
    await spot.save();

    return res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req,res) =>{
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
       return res.status(404).json({
            message:"Spot couldn't be found"
        });
    }
    if(spot.ownerId !== user.id){
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    await spot.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});

router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
     if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    const Reviews = await Review.findAll({
        where:{spotId : spot.id},
        include: [
            { model: User,
                attributes: ['id', 'firstName', 'lastName']},
                {model: ReviewImage,
                    attributes:['id', 'url'] }
                ],
            });
    return res.json({Reviews});
});


router.post('/:spotId/reviews', requireAuth, async (req,res)=>{
    const {review, stars} = req.body;
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"});
    }
    const getReview = await Review.findAll({
        where:{
            spotId: spot.id,
            userId: user.id
        }
    });
    if(getReview.length){
        return res.status(500).json({
            message: "User already has a review for this spot"
        });
    }

    const errors = {};
    if(!review){
        errors.review = "Review text is required";
    }
    if (!stars || typeof stars !== Number && stars < 1 || typeof stars !== Number && stars > 5){
        errors.stars = "Stars must be an integer from 1 to 5";
    }
    if(Object.values(errors).length !== 0){
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        });
    }
    const createdReview = await Review.create({
        spotId: spot.id,
        userId: user.id,
        review,
        stars
    });
    return res.status(201).json(createdReview);
});


router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const {user} = req;
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    if(spot.ownerId !== user.id){
        const Bookings = await Booking.findAll({
            where: {spotId: spot.id},
            attributes: ['spotId', 'startDate', 'endDate']
        });

        let arr = [];
        Bookings.forEach(booking => {
            arr.push(booking.toJSON());
        });

        arr.forEach(booking => {
            booking.startDate = booking.startDate.toISOString().split('T0')[0],
            booking.endDate = booking.endDate.toISOString().split('T0')[0]
        });
        return res.json({Bookings: arr});
    }

    if(spot.ownerId === user.id){
        const Bookings = await Booking.findAll({
            include:[
                {model: User,
                attributes: ['id', 'firstName', 'lastName']}
            ],
            where: { spotId: spot.id }
        });

        let arr = [];
        Bookings.forEach(booking => {
            arr.push(booking.toJSON());
        });

        arr.forEach(booking => {
            booking.startDate = booking.startDate.toISOString().split('T0')[0],
                booking.endDate = booking.endDate.toISOString().split('T0')[0]
        });

       return res.json({Bookings: arr});
    }
});


router.post('/:spotId/bookings', requireAuth, async (req, res)=>{
    const {user} = req;
    const { id, startDate, endDate, createdAt, updatedAt } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if(start >= end){
        return res.status(400).json(
            {
                 message: "Bad Request", // (or "Validation error" if generated by Sequelize),
                errors: {
                    endDate: "endDate cannot come before startDate"
                }
            }
        );
    }

    const bookings = await Booking.findAll({
        where: {spotId: spot.id}
    });

    const error = { message: "Sorry, this spot is already booked for the specified dates",
                    errors: {} };

    bookings.forEach(booking => {
        if(booking.startDate.getTime() <= start.getTime() && booking.endDate.getTime() >= start.getTime()){
            error.errors.startDate = "Start date conflicts with an existing booking";
        }
        if(booking.endDate.getTime() >= end.getTime() && booking.startDate.getTime() <= end.getTime()){
            error.errors.endDate = "End date conflicts with an existing booking";
        }
    });
    if (Object.keys(error.errors).length){
        return res.status(403).json(error);
    }

    if (spot.ownerId !== user.id) {
        const booking = await Booking.create({
         id: id,
         spotId: spot.id,
         userId: user.id,
         startDate: new Date(startDate),
         endDate: new Date(endDate),
         createdAt,
         updatedAt
        });

        const safeId = booking.dataValues.id;
        const create = booking.dataValues.createdAt;
        const update = booking.dataValues.updatedAt;

        const safeObj = {
            id: safeId,
            spotId: spot.id,
            userId: user.id,
            startDate: booking.startDate.toISOString().split('T0')[0],
            endDate: booking.endDate.toISOString().split('T0')[0],
            createdAt: create,
            updatedAt: update
        };

        return res.json(safeObj);
    }
    return res.status(403).json({message: 'Forbidden'});
});


module.exports = router;
