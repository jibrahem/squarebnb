import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { createSpotThunk, updateSpotThunk } from '../../store/spots';


const SpotForm = ({ spot, formType }) => {
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        spot = {...spot, country, street, city, state, latitude, longitude, description, name, price, image };

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
        if (!image) {
            errors.image = 'Preview Image is required'
        }
        if (!image.endsWith('.png' || '.jpg' || '.jpeg')) {
            errors.image = 'Image URL must end with .png, .jpg, or .jpeg'
        }
        setErrors(errors)

        if(!Object.values(errors).length){
            if (formType === 'Update your Spot') {
                const editedSpot = await dispatch(updateSpotThunk(spot));
                spot = editedSpot;
            } else if (formType === 'Create a new Spot') {
                const newSpot = await dispatch(createSpotThunk(spot));
                spot = newSpot;
            }
        } else {
            history.push(`/spots/${spot.id}`);
        }
    };

    if(formType === 'Create a new Spot'){
    return (
        <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
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
            <label>
                Street Address
                <input
                type='text'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                />
            </label>
            <label>
                City
                <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            <label>
                Latitude
                <input
                    type='text'
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
            </label>
            <label>
                Longitude
                <input
                    type='text'
                    value={city}
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
            <div>Create a title for your spot</div>
            <div>Catch guests' attention with a spot title that highlights what makes
                your place special.</div>
             <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
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
                <div>Liven up your spot with photos</div>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <input
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            />
            <input
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <button type="submit">{formType}</button>
        </form>
    )

} else if (formType === 'Update your Spot'){
        return (
            <form onSubmit={handleSubmit}>
                <h2>{formType}</h2>
                <div>Where's your place located?</div>
                <div>Guests will only get your exact address once they booked a reservation</div>
                <label>
                    Country
                    <input
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type='text'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </label>
                <label>
                    City
                    <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State
                    <input
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label>
                    Latitude
                    <input
                        type='text'
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type='text'
                        value={city}
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
                <div>Create a title for your spot</div>
                <div>Catch guests' attention with a spot title that highlights what makes
                    your place special.</div>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">{formType}</button>
            </form>
        )

}
}


export default SpotForm;
