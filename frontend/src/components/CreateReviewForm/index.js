import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getOneSpotThunk } from "../../store/spots";
import './CreateReview.css'


const CreateReviewForm = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [stars, setStars] = useState(1);
    const [starRating, setStarRating] = useState()
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewObj = {
            spotId: spot.id,
            userId: user.id,
            review: text,
            stars,
        }
        const errors = {};

        if (text.length < 10) {
            errors.text = 'Review text needs 10 characters minimum'
        }
        if(text.length > 200){
            errors.text = "Review text must be less than 200 characters"
        }
        if (!stars) {
            errors.stars = "Stars must be an integer from 1 to 5";
        }


        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            const newReview = await dispatch(createReviewThunk(spot, reviewObj, user))
            await dispatch(getOneSpotThunk(spot.id))
            .then(closeModal)
        }
        if (!reviewObj) {
            return null
        }
        if (!spot) {
            return null
        }
    }


    // let isDisabled = true;
    // if (text.length > 10 && Object.values(errors).length === 0){
    //     isDisabled = false
    // }

    const setStar = (num)=> {
        if(num <= stars){
            return "fa-solid fa-star";
        }
            return "fa-regular fa-star";
    }

    return (
        <>
        <div className="post-review">
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <div className="errors">{errors.text}</div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Leave your review here..."
                />
                <div className="errors">{errors.stars}</div>
                <div className="rating-input">
                        <i class="fa-regular fa-star"
                        style={{ color: 'black' }}
                        onClick={() => setStars(1)}
                        onMouseEnter={() => setStars(1)}
                        onMouseLeave={() => setStarRating(0)}
                        className={setStar(1)}></i>

                        <i class="fa-regular fa-star"
                        style={{ color: 'black' }}
                        onClick={() => setStars(2)}
                        onMouseEnter={() => setStars(2)}
                        onMouseLeave={() => setStarRating(0)}
                        className={setStar(2)}></i>

                    <i class="fa-regular fa-star"
                        style={{ color: 'black' }}
                        onClick={() => setStars(3)}
                        onMouseEnter={() => setStars(3)}
                        onMouseLeave={() => setStarRating(0)}
                        className={setStar(3)}></i>

                    <i class="fa-regular fa-star"
                        style={{ color: 'black' }}
                        onClick={() => setStars(4)}
                        onMouseEnter={() => setStars(4)}
                        onMouseLeave={() => setStarRating(0)}
                        className={setStar(4)}></i>

                    <i class="fa-regular fa-star"
                        style={{color: 'black'}}
                        onClick={() => setStars(5)}
                        onMouseEnter={() => setStarRating(5)}
                        onMouseLeave={() => setStarRating(0)}
                        className={setStar(5)}></i> Stars
                </div>

                <button type='submit'>Submit Your Review</button>
            </form>
            </div>
        </>
    )
}

export default CreateReviewForm;
