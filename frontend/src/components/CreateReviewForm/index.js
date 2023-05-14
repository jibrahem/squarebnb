import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getOneSpotThunk } from "../../store/spots";

const CreateReviewForm = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [stars, setStars] = useState(1);
    const [starRating, setStarRating] = useState(1)
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = {
            spotId: spot.id,
            userId: user.id,
            review: text,
            stars,
        }
        const errors = {};

        if (!text) {
            errors.text = 'Review text is required'
        }
        if (!stars) {
            errors.stars = "Stars must be an integer from 1 to 5";
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            const newReview = await dispatch(createReviewThunk(spot, review))
                .then(dispatch(getOneSpotThunk(spot.id)))
        }
        if (!review) {
            return null
        }
        if (!spot) {
            return null
        }
    }

    return (
        <>
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <div className="errors">{errors.text}</div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="rating-input">
                    <div
                        className={starRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setStarRating(1)}
                        onMouseLeave={() => setStarRating(1)}
                        onClick={() => setStars(1)}>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div
                        className={starRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => setStarRating(2)}
                        onMouseLeave={() => setStarRating(2)}
                        onClick={() => setStars(2)}>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div
                        className={starRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => setStarRating(3)}
                        onMouseLeave={() => setStarRating(3)}
                        onClick={() => setStars(3)}>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div
                        className={starRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => setStarRating(4)}
                        onMouseLeave={() => setStarRating(4)}
                        onClick={() => setStars(4)}>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div
                        className={starRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => setStarRating(5)}
                        onMouseLeave={() => setStarRating(5)}
                        onClick={() => setStars(5)}>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
                <button type='submit'>Submit Your Review</button>
            </form>
        </>
    )
}

export default CreateReviewForm;
