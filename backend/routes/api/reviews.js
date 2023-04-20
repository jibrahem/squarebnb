const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res)=>{
    const { user } = req;
    const currentReview = await Review.findByPk(user.id, {
        include:[
            {model: User,
            attributes: ['id', 'firstName', 'lastName']
            },
            {model: Spot,
            attributes: {exclude: ['description', 'createdAt', 'updatedAt']}}
        ]
    });
    res.json(currentReview);
});

module.exports = router;
