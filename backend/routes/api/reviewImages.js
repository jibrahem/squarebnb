const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Booking, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res) =>{
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    if(!reviewImage){
        return res.status(404).json({
            message: "Review Image couldn't be found"
        });
    }
    await reviewImage.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;
