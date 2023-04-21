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
    const start = new Date(startDate);
    const end = new Date(endDate);

    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    }
    if(end < start){
        return res.status(400).json({
            endDate: "endDate cannot come before startDate"
        });
    }
    const now = new Date();
    if(startDate < now || endDate < now){
        res.status(403).json({
            message: "Past bookings can't be modified"
        });
    }
    if(start){
        booking.startDate = start;
    }
    if(end){
        booking.endDate = end;
    }
    return res.json(booking);
});

router.delete('/:bookingId', requireAuth, async (req, res)=>{
    const {user} = req;
    const booking = await Booking.findByPk(req.params.bookingId, {
        where: {userId : user.id}
});
    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    }
    const now = new Date();
    if(booking.startDate > now){
       return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        });
    }

    await booking.destroy();
    return res.json({
        message: "Successfully deleted"
    });

});


module.exports = router;
