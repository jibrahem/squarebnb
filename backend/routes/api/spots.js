const express = require('express');
const { Spot, User } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res)=>{
    const spot = await Spot.findAll({
    });
       return res.json(spot);
});



module.exports = router;
