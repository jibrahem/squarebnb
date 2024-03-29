import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { allBookingsOfUserThunk, updateBookingThunk } from '../../store/bookings';
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

const EditBookingForm = ({ spot, booking }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [startDate, setStartDate] = useState(booking.startDate)
    const [endDate, setEndDate] = useState(booking.endDate)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingObj = {
            ...booking,
            spotId: spot.id,
            userId: user.id,
            startDate,
            endDate,
        }

        if (startDate >= new Date().toJSON().slice(0, 10) &&
            endDate > new Date().toJSON().slice(0, 10)) {
            setErrors({})
            return dispatch(updateBookingThunk(bookingObj, spot))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
                history.push('/bookings/current')
            })
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
                <h1>Update your stay at {spot.name}</h1>
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
                    <button type="submit">Update your stay</button>
                </form>
            </div>
        </>
    )


}

export default EditBookingForm
