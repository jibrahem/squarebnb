import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneSpotThunk, updateSpotThunk } from "../../store/spots";
import SpotForm from "../SpotForm";
import { useHistory } from "react-router-dom";

const EditSpotForm = () => {
    let { spotId } = useParams();
    spotId = Number(spotId);
    const spot = useSelector((state) => state.spots.singleSpot);
    console.log('spot', spot)
    const history = useHistory();
    const [country, setCountry] = useState(spot?.country);
    const [street, setStreet] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [latitude, setLatitude] = useState(spot?.lat);
    const [longitude, setLongitude] = useState(spot?.lng);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotObj = {
            ...spot,
            country,
            address: street,
            city,
            state,
            lat: latitude,
            lng: longitude,
            description,
            name,
            price,
        };

        const errors = {}
        if (!country) {
            errors.country = 'Country is required'
        }
        if (!street) {
            errors.street = 'Address is required'
        }
        if (!city) {
            errors.city = 'City is required'
        }
        if (!state) {
            errors.state = 'State is required'
        }
        if (!latitude) {
            errors.latitude = 'Latitude is required'
        }
        if (!longitude) {
            errors.longitude = 'Longitude is required'
        }
        if (!description || description.length < 30) {
            errors.description = 'Description needs a minimum of 30 characters'
        }
        if (!name) {
            errors.name = 'Name is required'
        }
        if (!price) {
            errors.price = 'Price is required'
        }


        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            const editedSpot = await dispatch(updateSpotThunk(spotObj));
            history.push(`/spots/${editedSpot.id}`)

        }
    }

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId));
    }, [dispatch, spotId]);
    
    if (!spot) return null;

    if (spot.id === spotId) {
        return (
            Object.keys(spot).length > 1 && (
                <>
                    <div className='spot-form'>
                        <form onSubmit={handleSubmit}>
                            <h2>Update Spot</h2>
                            <div>Where's your place located?</div>
                            <div>Guests will only get your exact address once they booked a reservation</div>
                            <div className='errors'>{errors.country}</div>
                            <label>
                                Country
                                <input
                                    type='text'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </label>
                            <div className='errors'>{errors.street}</div>
                            <label>
                                Street Address
                                <input
                                    type='text'
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </label>
                            <div className='errors'>{errors.city}</div>
                            <label>
                                City
                                <input
                                    type='text'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>
                            <div className='errors'>{errors.state}</div>
                            <label>
                                State
                                <input
                                    type='text'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </label>
                            <div className='errors'>{errors.latitude}</div>
                            <label>
                                Latitude
                                <input
                                    type='text'
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </label>
                            <div className='errors'>{errors.longitude}</div>
                            <label>
                                Longitude
                                <input
                                    type='text'
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                            </label>
                            <div>Describe your place to guests</div>
                            <div>Mention the best features of your space, any special amentities like
                                fast wif or parking, and what you love about the neighborhood.</div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className='errors'>{errors.description}</div>
                            <div>Create a title for your spot</div>
                            <div>Catch guests' attention with a spot title that highlights what makes
                                your place special.</div>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className='errors'>{errors.name}</div>
                            <div>Set a base price for your spot</div>
                            <div>Competitive pricing can help your listing stand out and rank higher
                                in search results.</div>
                            <label>
                                $
                                <input
                                    type='text'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>
                            <div className='errors'>{errors.price}</div>
                            <button type="submit">Update Spot</button>
                        </form>
                    </div>
                </>
            )
        )
    }
}

export default EditSpotForm;
