import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

const CreateReviewForm = ( {spot} ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [stars, setStars] = useState(1);
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
        const errors ={};

        if (!text) {
            errors.text = 'Review text is required'
        }
        if (!stars) {
            errors.stars = "Stars must be an integer from 1 to 5";
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            const newReview =  await dispatch(createReviewThunk(spot, review))
            history.push(`/spots/${newReview.spotId}`)
        }
        if(!review){
            return null
        }
        if(!spot){
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
                <button type='submit'>Submit Your Review</button>
            </form>
        </>
    )
}

export default CreateReviewForm;
