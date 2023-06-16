import { csrfFetch } from "./csrf";
export const ADD_BOOKING = 'bookings/ADD_BOOKING';
export const GET_USER_BOOKING = 'bookings/GET_USER_BOOKING';
export const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'
export const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING';

export const addBooking = (booking) => ({
    type: ADD_BOOKING,
    booking,
});

export const currentUserBooking = (bookings) => ({
    type: GET_USER_BOOKING,
    bookings,
})

export const editBooking = (booking) => ({
    type: UPDATE_BOOKING,
    booking,
});

export const removeBooking = (booking) => ({
    type: REMOVE_BOOKING,
    booking,
})

export const allBookingsOfUserThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current')

    if (response.ok) {
        const userBookings = await response.json()
        dispatch(currentUserBooking(userBookings))
    }
}

export const createBookingThunk = (spot, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    })
    if (response.ok) {
        const spotBooking = await response.json()
        dispatch(addBooking(spotBooking))
        return spotBooking
    }
}

export const updateBookingThunk = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    })
    if (response.ok) {
        const updatedBooking = await response.json();
        dispatch(editBooking(updatedBooking));
        return updatedBooking;
    } else {
        const errors = await response.json()
        return errors
    }
}

export const deleteBookingThunk = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(removeBooking(booking));
        return booking
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = { user: {}, spot: {} };

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } }
            action.bookings.Bookings.forEach(booking => {
                newState.user[booking.id] = booking
            })
            return newState
        case UPDATE_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } }
            return { ...state, user: { ...action.booking } }
        case ADD_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } }
            newState.spot[action.booking.id] = action.booking
            return newState
        case REMOVE_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: {} }
            delete newState.user[action.booking.id]
            return newState
        default:
            return state
    }
}

export default bookingReducer;
