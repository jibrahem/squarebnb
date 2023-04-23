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
    if(!Bookings.length){
        res.status(404).json({
            message: "No bookings created for User"
        });
    }
    return res.json({Bookings});
});

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    const booking = await Booking.findByPk(req.params.bookingId);
    const {id, spotId, startDate, endDate, createdAt, updatedAt} = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);

    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    }

    if(booking.userId !== user.id){
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    if(end < start){
        return res.status(400).json({
            message: "Bad Request",
            errors:{
            endDate: "endDate cannot come before startDate"
            }
        });
    }

    const now = new Date();
    if(startDate < now || endDate < now){
        return res.status(403).json({
            message: "Past bookings can't be modified"
        });
    }
    if(start){
        booking.startDate = start;
    }
    if(end){
        booking.endDate = end;
    }

    const safeId = booking.dataValues.id;
    const spot = booking.dataValues.spotId;
    const create = booking.dataValues.createdAt;
    const update = booking.dataValues.updatedAt;

    const safeObj = {
        id: safeId,
        spotId: spot,
        userId: user.id,
        startDate: booking.startDate.toISOString().split('T0')[0],
        endDate: booking.endDate.toISOString().split('T0')[0],
        createdAt: create,
        updatedAt: update
    };
    await booking.save();
    return res.json(safeObj);
});

router.delete('/:bookingId', requireAuth, async (req, res)=>{
    const {user} = req;
    const booking = await Booking.findByPk(req.params.bookingId);
    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    }
    if(booking.userId !== user.id){
        return res.status(403).json({
            message: "Forbidden"
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
