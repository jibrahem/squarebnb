const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const Reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot, include: { model: SpotImage },
                attributes: { exclude: ['description', 'createdAt', 'updatedAt'] }
            },
            { model: ReviewImage, attributes: { exclude: ['reviewId', 'createdAt', 'updatedAt'] } },
        ]
    });
    let reviewList = [];
    for (let i = 0; i < Reviews.length; i++) {
        const review = Reviews[i];
        reviewList.push(review.toJSON());
    }
    reviewList.forEach(review => {
        const spot = review.Spot;
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
            if (!review.Spot.previewImage) {
                spot.previewImage = 'No preview image found';
            }
        });
        delete spot.SpotImages;
        spot.price = Number(spot.price);
        spot.lng = Number(spot.lng);
        spot.lat = Number(spot.lat);
    });

    return res.json({ Reviews: reviewList });
});

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url, reviewId } = req.body;
    const { user } = req;
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
    const count = await ReviewImage.count({
        where: { reviewId: review.id }
    });
    if (review.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    if (count >= 9) {
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


router.put('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    const { review, stars } = req.body;
    const editedReview = await Review.findByPk(req.params.reviewId);
    if (!editedReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
    if (editedReview.userId !== user.id) {
        res.status(403).json({
            message: "Forbidden"
        });
    }
    const errors = {};
    if (!review) {
        errors.review = "Review text is required";
    }
    if (typeof stars !== Number && stars < 1 || typeof stars !== Number && stars > 5) {
        errors.stars = "Stars must be an integer from 1 to 5";
    }
    if (Object.values(errors).length !== 0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errors
        });
    }
    if (review) {
        editedReview.review = review;
    }
    if (stars) {
        editedReview.stars = stars;
    }
    await editedReview.save();

    return res.json(editedReview);

});

router.delete('/:reviewId', async (req, res) => {
    const { user } = req;
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
    if (review.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    await review.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});



module.exports = router;
