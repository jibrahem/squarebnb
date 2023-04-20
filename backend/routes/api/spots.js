const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// const validateSpot = [
//     check('address')
//         .exists({ checkFalsy: true })
//         .withMessage("Street address is required"),
//     check('city')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 2 })
//         .withMessage("City is required"),
//     check('state')
//         .not()
//         .withMessage("State is required"),
//     check('country')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 2 })
//         .withMessage("Country is required"),
//     check('lat')
//         .not()
//         .withMessage("Latitude is not valid"),
//     check('lng')
//         .not()
//         .withMessage("Longitude is not valid"),
//     check('name')
//         .not()
//         .withMessage("Name must be less than 50 characters"),
//     check('description')
//         .not()
//         .withMessage("Description is required"),
//     check('price')
//         .not()
//         .withMessage("Price per day is required"),
//     handleValidationErrors
// ];

router.get('/', async (req, res) => {
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
    const currentSpot = await Spot.findByPk(user.id, {
    include: [
        { model: Review },
        { model: SpotImage }
    ]
    });
    let Spots = [];
        Spots.push(currentSpot.toJSON());

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
   const owner = req.user.id;
    const spot = await Spot.create({
        ownerId: owner,
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
    return res.json(spot);
});

router.post('/:spotId/images', requireAuth, async(req, res) =>{
   const {url, preview} = req.body;
   const updatedSpot = await SpotImage.findByPk(req.params.spotId, {
    attributes: {exclude: ['spotId', 'createdAt', 'updatedAt']},
    url: url,
    preview: preview,
   });
   if(!updatedSpot){
       return res.status(404).json({
           message: "Spot couldn't be found",
       });
   }
  return res.json(updatedSpot);
});

router.put('/:spotId', requireAuth, async (req, res)=>{
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const editedSpot = await Spot.findByPk(req.params.spotId);
    if(!editedSpot){
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
      if(address){
        editedSpot.address = address;
    }
    if (city) {
        editedSpot.city = city;
    }
    if (state) {
        editedSpot.state = state;
    }
    if (country) {
        editedSpot.country = country;
    }
    if (lat) {
        editedSpot.lat = lat;
    }
    if (lng) {
        editedSpot.lng = lng;
    }
    if (name) {
        editedSpot.name = name;
    }
    if (description) {
        editedSpot.description = description;
    }
    if (price) {
        editedSpot.price = price;
    }
    return res.json(editedSpot);
});

router.delete('/:spotId', async (req,res) =>{
    const deletedSpot = await Spot.findByPk(req.params.spotId);
    if(!deletedSpot){
        res.status(404).json({
            message:"Spot couldn't be found"
        });
    }
    await deletedSpot.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;
