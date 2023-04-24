const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Booking, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


router.get('/', async (req, res) => {

    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    page = parseInt(page);
    size = parseInt(size);
    minLat = parseInt(minLat);


    if(!page) page = 1;
    if(!size || size > 20) size = 20;
    if(page > 10) page = 10;

    const pagination = {};

    if(page >= 1 && size >= 1){
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const error = {};


    const allSpots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ]
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
    });

    return res.json({Spots});
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

    if(!Spots.length){
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }

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
        spot.lat = Number(spot.lat);
        spot.lng = Number(spot.lng);

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

   return res.json(spot);
});


router.post('/', requireAuth, async (req, res) => {
const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body;
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

router.put('/:spotId', requireAuth, async (req, res)=>{
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
    const Reviews = await Review.findAll({
        where:{spotId : spot.id},
        include: [
            { model: User,
                attributes: ['id', 'firstName', 'lastName']},
                {model: ReviewImage,
                    attributes:['id', 'url'] }
                ],
            });
            if(!Reviews.length){
                return res.status(404).json({
                    message: "Spot couldn't be found"
                });
            }
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
        return res.json({Bookings});
    }

    if(spot.ownerId === user.id){
        const Bookings = await Booking.findAll({
            include:[
                {model: User}
            ],
            where: { spotId: spot.id }
        });
       return res.json({Bookings});
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
        console.log(error);
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
    return res.json({message: 'You are the owner of this spot'});
});


module.exports = router;
