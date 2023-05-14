import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import './DeleteModal.css'

function DeleteModal({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        return dispatch(deleteSpotThunk(spot))
            .then(closeModal)
    };

    return (
        <>
        <div className="delete">
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot from the listings?</h4>
            <form onSubmit={handleSubmit}>
                <div className='red'>
                <button type='submit'>
                    Yes(Delete Spot)
                </button>
                    </div>
                    <div className="grey">
                <button onClick={closeModal}>
                    No(Keep Spot)
                </button>
                    </div>
            </form>
            </div>
        </>
    );
}

export default DeleteModal;
