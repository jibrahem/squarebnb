import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneSpotThunk, updateSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";

const EditSpotForm = () => {
    let { spotId } = useParams();
    spotId = Number(spotId);
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.singleSpot);

    console.log('editspot', spot)

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch, spotId]);


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

        const editedSpot = await dispatch(updateSpotThunk(spotObj));

        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            history.push(`/spots/${editedSpot.id}`)
        }
    }

    if (!spot) return null;

    if (spot.id === spotId) {
        return (
            Object.keys(spot).length > 1 && (
                <>
                    <div className='spot-form'>
                        <form onSubmit={handleSubmit}>
                            <h2>Update Spot</h2>
                            <h3>Where's your place located?</h3>
                            <h5>Guests will only get your exact address once they booked a reservation</h5>
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
                            <div className="city">
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
                            </div>
                            <div className='errors'>{errors.latitude}</div>
                            <div className="lat">
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
                            </div>
                            <h3>Describe your place to guests</h3>
                            <h5>Mention the best features of your space, any special amentities like
                                fast wif or parking, and what you love about the neighborhood.</h5>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className='errors'>{errors.description}</div>
                            <h3>Create a title for your spot</h3>
                            <h5>Catch guests' attention with a spot title that highlights what makes
                                your place special.</h5>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className='errors'>{errors.name}</div>
                            <h3>Set a base price for your spot</h3>
                            <h5>Competitive pricing can help your listing stand out and rank higher
                                in search results.</h5>
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
