import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBookingThunk, allBookingsOfUserThunk } from '../../store/bookings';
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

const CreateBookingForm = ({ spot }) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10))
    const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10))
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        const booking = {
            spotId: spot.id,
            userId: user.id,
            startDate,
            endDate,
        }
        if (startDate >= new Date().toJSON().slice(0, 10) &&
            endDate > new Date().toJSON().slice(0, 10)) {
            return dispatch(createBookingThunk(spot, booking))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                        history.push(`/spots/${spot.id}`)
                    }
                })
                .then(dispatch(allBookingsOfUserThunk()))
                .then(history.push('/bookings/current'))
        }
        return setErrors({
            startDate: 'Cannot book in the past'
        })
    }

    if (!spot) {
        return null
    }




    return (
        <>
            <div className="loggin">
                <h1>Book your stay at {spot.name}</h1>
                <form onSubmit={handleSubmit}>
                    <label>Start Date
                        <input
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </label>
                    {errors.startDate && <div className="errors">{errors.startDate}</div>}
                    <label>End Date
                        <input
                            type='date'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </label>
                    {errors.endDate && <div className="errors">{errors.endDate}</div>}
                    <button type="submit">Book your stay</button>
                </form>
            </div>
        </>
    )
}

export default CreateBookingForm
