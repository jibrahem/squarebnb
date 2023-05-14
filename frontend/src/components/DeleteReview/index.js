import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";

function DeleteReview({ review }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        return dispatch(deleteReviewThunk(review))
            .then(closeModal)
    };

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
