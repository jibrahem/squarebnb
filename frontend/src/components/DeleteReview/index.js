import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";


function DeleteReview({ review, spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    console.log('spot in delete modal', spot)

    const handleSubmit = async (e) => {
        e.preventDefault()
            const deleted = await dispatch(deleteReviewThunk(review))
            if(deleted.id === review.id){
                dispatch(getOneSpotThunk(spot.id))
                closeModal()
            };
        }

    return (
        <>
        <div className="delete">
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to delete this review?</h4>
            <form onSubmit={handleSubmit}>
                <div className="red">
                <button type='submit'>
                    Yes(Delete Review)
                </button>
                </div>
                <div className="grey">
                <button onClick={closeModal}>
                    No(Keep review)
                </button>
                </div>
            </form>
            </div>
        </>
    );
}

export default DeleteReview;
