const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) =>{
    const { user } = req;
    const Bookings = await Booking.findAll({
        where: {userId: user.id},
        include: [
            {model: Spot}
        ]
    });
    res.json({Bookings});
});

router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    const {startDate, endDate} = req.body;
    if(!booking){
        res.status(404).json({
            message: "Booking couldn't be found"
        });
    }
    if(endDate <= startDate){
        res.status(400).json({
            endDate: "endDate cannot come before startDate"
        });
    }
    const now = new Date();
    if(startDate < now || endDate < now){
        res.status(403).json({
            message: "Past bookings can't be modified"
        });
    }
    if(startDate){
        booking.startDate = startDate;
    }
    if(endDate){
        booking.endDate = endDate;
    }
    
});


module.exports = router;
