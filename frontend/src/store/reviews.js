import { csrfFetch } from './csrf';
export const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
export const ADD_REVIEW = 'reviews/ADD_REVIEW';
export const GET_USER_REVIEW = 'reviews/GET_USER_REVIEW';
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

export const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews,
});

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});

export const currentUserReview = (reviews) => ({
    type: GET_USER_REVIEW,
    reviews,
});

export const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

export const removeReview = (review) => ({
    type: REMOVE_REVIEW,
    review,
});

export const allReviewsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const spotReviews = await response.json()
        dispatch(getAllReviews(spotReviews))
        return spotReviews
    }
}

export const allReviewsOfUserThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current')

    if (response.ok) {
        const userReviews = await response.json()
        dispatch(currentUserReview(userReviews))
    }
}

export const createReviewThunk = (spot, review, user) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    })
    if (response.ok) {
        const spotReview = await response.json()
        spotReview.User = user
        dispatch(addReview(spotReview))
        return spotReview;
    } else {
        const errors = await response.json()
        return errors
    }
}

export const updateReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    })
    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReview(updatedReview));
        return updatedReview;
    } else {
        const errors = await response.json();
        return errors
    }
}

export const deleteReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(removeReview(review));
        return review;
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = { spot: {}, user: {} };

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            return newState
        case GET_USER_REVIEW:
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            action.reviews.Reviews.forEach(review => {
                newState.user[review.id] = review
            })
            return newState
        case UPDATE_REVIEW:
            newState = newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            return { ...state, user: { ...action.review } }
        case ADD_REVIEW:
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            newState.spot[action.review.id] = action.review
            return newState
        case REMOVE_REVIEW:
            newState = { ...state, spot: { ...state.spot }, user: {} }
            delete newState.spot[action.review.id]
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
