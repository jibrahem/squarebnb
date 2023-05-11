import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { Link } from "react-router-dom";

function DeleteModal({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
console.log('SPOTTTTT', spot)

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(deleteSpotThunk(spot))
            .then(closeModal)
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot from the listings?</h4>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Yes(Delete Spot)
                </button>
                <button>
                    <Link to='/spots/current'>
                    No(Keep Spot)
                    </Link>
                </button>
            </form>
        </>
    );
}

export default DeleteModal;
