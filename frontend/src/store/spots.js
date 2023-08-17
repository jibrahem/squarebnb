import { csrfFetch } from "./csrf";
export const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
export const GET_QUERY_SPOTS = 'spots/GET_QUERY_SPOTS'
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
export const GET_USER_SPOT = 'spots/GET_USER_SPOT'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const REMOVE_SPOT = 'spots/REMOVE_SPOT';

//action creator
export const getSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots,
});

export const getQuerySpots = (spots) => ({
    type: GET_QUERY_SPOTS,
    spots,
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
});

export const currentUserSpot = (spots) => ({
    type: GET_USER_SPOT,
    spots,
});

export const editSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot,
});

export const removeSpot = (spot) => ({
    type: REMOVE_SPOT,
    spot,
});

//thunk action creator
export const allSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots))
    }
}

export const searchSpotsThunk = (query) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${query}`)

    if (response.ok) {
        const spots = await response.json()
        dispatch(getQuerySpots(spots))
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const getOneSpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spotDetails = await response.json();
        dispatch(receiveSpot(spotDetails))
        return spotDetails;
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const allSpotsOfUserThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const userSpots = await response.json()
        dispatch(currentUserSpot(userSpots))
    }
}

export const createSpotThunk = (spot, images) => async (dispatch) => {
    console.log('spot in thunk', spot)
    console.log('spotimages in thunk', images)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });
    console.log('response', response)
    const newSpot = await response.json();
    console.log('newspot', newSpot)
    if (response.ok) {
        const formData = new FormData();
        console.log('array', Array.from(images))
        Array.from(images).forEach(image => formData.append("images", image))
        const res = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            body: formData,
        })
        console.log('formdata', formData)
        console.log('res', res)
        if (res.ok) {
            const data = await res.json()
            data.spot = newSpot
            data.SpotImages = images
            dispatch(receiveSpot(data))
            console.log('data in thunk', data)
        }
        return res;

    } else {
        const errors = await response.json();
        return errors;
    }
}

export const updateSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    })
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(editSpot(updatedSpot));
        return updatedSpot;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const deleteSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(removeSpot(spot));
    } else {
        const errors = await response.json()
        return errors
    }
}


const initialState = { allSpots: {}, singleSpot: {}, query: {} };

//reducer: case in the reducer for all spots
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { allSpots: { ...state.allSpots } };
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState
        case GET_QUERY_SPOTS:
            newState = { ...state, query: { ...state.query } };
            newState.query = action.spots.Spots
            return newState

        case RECEIVE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            return { ...state, singleSpot: { ...action.spot } };
        case GET_USER_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        case UPDATE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            return { ...state, singleSpot: { ...action.spot } };
        case REMOVE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} };
            delete newState.allSpots[action.spot.id];
            return newState;
        default:
            return state;
    }
}
export default spotReducer;
