const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res)=>{
    const { user } = req;
    const Reviews = await Review.findAll({
        where: {userId: user.id},
        include:[
            {model: User,
            attributes: ['id', 'firstName', 'lastName']
            },
            {model: Spot,
            attributes: {exclude: ['description', 'createdAt', 'updatedAt']}},
            {model: ReviewImage, attributes: {exclude: ['reviewId', 'createdAt', 'updatedAt']}}
        ]
    });
    if(!Reviews.length){
        return res.status(404).json({
            message: "Reviews couldn't be found"
        });
    }
   return res.json({Reviews});
});

router.post('/:reviewId/images', requireAuth, async (req, res) =>{
    const {url, reviewId} = req.body;
     const {user} = req;
    const review = await Review.findByPk(req.params.reviewId);

    if(!review){
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
    const count = await ReviewImage.count({
        where: {reviewId : review.id}
    });
    if(review.userId !== user.id){
        return res.status(403).json({
            message: "Forbidden"
        });
    }
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
    const editedReview = await Review.findByPk(req.params.reviewId);
    if (!editedReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
    if(editedReview.userId !== user.id){
        res.status(403).json({
            message: "Forbidden"
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

router.delete('/:reviewId', async (req, res) =>{
    const { user } = req;
    const review = await Review.findByPk(req.params.reviewId);
    if(!review){
       return res.status(404).json({
           message: "Review couldn't be found"
        });
    }
    if(review.userId !== user.id){
        return res.status(403).json({
            message: "Forbidden"
        })
    }
    await review.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});



module.exports = router;
