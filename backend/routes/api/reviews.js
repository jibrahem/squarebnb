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
            attributes: {exclude: ['description', 'createdAt', 'updatedAt']}},
            {model: ReviewImage, attributes: {exclude: ['reviewId', 'createdAt', 'updatedAt']}}
        ]
    });
   return res.json(currentReview);
});

router.post('/:reviewId/images', requireAuth, async (req, res) =>{
    const {url, reviewId} = req.body;
    const review = await Review.findByPk(req.params.reviewId);

    if(!review){
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
    const count = await ReviewImage.count({
        where: {reviewId : review.id}
    });
    if(count >= 9){
       return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        });
    }

    const reviewImage = await ReviewImage.create({
        url,
        reviewId: review.id,
    });

    const correct = reviewImage.toJSON();
    delete correct.reviewId;
    delete correct.updatedAt;
    delete correct.createdAt;

    return res.json(correct);
});


router.put('/:reviewId', requireAuth, async(req, res) =>{
    const { user } = req;
    const {review, stars} = req.body;
    const editedReview = await Review.findByPk(req.params.reviewId,{
        where: {userId: user.id}
    });
    if (!editedReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
        if(review){
            editedReview.review = review;
        }
        if(stars){
            editedReview.stars = stars;
        }
        return res.json(editedReview);

});
//have to own the review.dataValues.id key into within the users
// keying the id datavalues and it exists
module.exports = router;
