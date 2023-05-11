import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";

function DeleteModal({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        return dispatch(deleteSpotThunk(spot))
            .then(closeModal)
    };

    //onclick instead of button-link

    return (
        <>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot from the listings?</h4>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Yes(Delete Spot)
                </button>
                <button onClick={closeModal}>
                    No(Keep Spot)
                </button>
            </form>
        </>
    );
}

export default DeleteModal;
