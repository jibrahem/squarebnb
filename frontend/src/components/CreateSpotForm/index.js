import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css'

const CreateSpotForm = () => {
    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        lat: '',
        lng: '',
        description: '',
        name: '',
        price: '',
    };

    const history = useHistory();
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState(1);
    const [longitude, setLongitude] = useState(1);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState('');
    // const [img1, setImg1] = useState('');
    // const [img2, setImg2] = useState('');
    // const [img3, setImg3] = useState('');
    // const [img4, setImg4] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const SpotImages =
        [
            { preview: true, url: images[0] },
            { preview: false, url: images[1] },
            { preview: false, url: images[2] },
            { preview: false, url: images[3] },
            { preview: false, url: images[4] }]

    SpotImages.forEach((image) => {
        if (image.url === undefined ) {
            image.url = 'https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg'
        }
    })

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
            SpotImages
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

        if (!images[0]) {
            errors.previewImage = 'Preview Image is required'
        }
        // if (image && !(image.endsWith('.png') || image.endsWith('.jpg') || image.endsWith('.jpeg'))) {
        //     errors.image = 'Image URL must end with .png, .jpg, or .jpeg'
        // }
        // if (img1 && !(img1.endsWith('.png') || img1.endsWith('.jpg') || img1.endsWith('.jpeg'))) {
        //     errors.img1 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }
        // if (img2 && !(img2.endsWith('.png') || img2.endsWith('.jpg') || img2.endsWith('.jpeg'))) {
        //     errors.img2 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }
        // if (img3 && !(img3.endsWith('.png') || img3.endsWith('.jpg') || img3.endsWith('.jpeg'))) {
        //     errors.img3 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }
        // if (img4 && !(img4.endsWith('.png') || img4.endsWith('.jpg') || img4.endsWith('.jpeg'))) {
        //     errors.img4 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }


        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            const newSpot = await dispatch(createSpotThunk(spotObj, SpotImages));
            history.push(`/spots/${newSpot.id}`)
        }
        if (!spot) {
            return null;
        }
    };

    const updateFiles = e => {
        const files = e.target.files;
        setImages(files);
    };
    // const updateFile1 = e => {
    //     const file = e.target.files[0];
    //     setImg1(file);
    // };
    // const updateFile2 = e => {
    //     const file = e.target.files[0];
    //     setImg2(file);
    // };
    // const updateFile3 = e => {
    //     const file = e.target.files[0];
    //     setImg3(file);
    // };
    // const updateFile4 = e => {
    //     const file = e.target.files[0];
    //     setImg4(file);
    // };

    return (
        <div className='spot-form'>
            <form onSubmit={handleSubmit}>
                <div className='location'>
                    <h2>Create a new Spot</h2>
                    <h3>Where's your place located?</h3>
                    <h5>Guests will only get your exact address once they booked a reservation.</h5>
                    <label>
                        <div className='flex'>
                            Country
                            <br></br>
                            <div className='errors'>{errors.country}</div>
                        </div>
                        <input
                            type='text'
                            placeholder=' Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='flex'>
                            Street Address
                            <div className='errors'>{errors.street}</div>
                        </div>
                        <input
                            type='text'
                            placeholder=' Address'
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </label>
                    <div className='city'>
                        <label>
                            <div className='flex'>
                                City
                                <div className='errors'>{errors.city}</div>
                            </div>
                            <div className='city-input'>
                                <div className='comma'>
                                    <input
                                        type='text'
                                        placeholder=' City'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    /> ,
                                </div>
                            </div>
                        </label>
                        <label>
                            <div className='flex'>
                                State
                                <div className='errors'>{errors.state}</div>
                            </div>
                            <input
                                type='text'
                                placeholder=' STATE'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='lat'>
                        <label>
                            <div className='flex'>
                                Latitude
                                <div className='errors'>{errors.latitude}</div>
                            </div>
                            <div className='lat-input'>
                                <div className='comma'>
                                    <input
                                        type='number'
                                        placeholder='latitude'
                                        min='-90'
                                        max='90'
                                        step='any'
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                    /> ,
                                </div>
                            </div>
                        </label>
                        <label>
                            <div className='flex'>
                                Longitude
                                <div className='errors'>{errors.longitude}</div>
                            </div>
                            <div className='lng-input'>
                                <input
                                    type='number'
                                    placeholder='longitude'
                                    min='-180'
                                    max='180'
                                    step='any'
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <div className='descript'>
                    <h3>Describe your place to guests</h3>
                    <h6>Mention the best features of your space, any special amentities like
                        fast wif or parking, and what you love about the neighborhood.</h6>
                    <textarea
                        value={description}
                        placeholder=' Please write at least 30 characters'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className='errors'>{errors.description}</div>
                </div>
                <div className='name'>
                    <h3>Create a title for your spot</h3>
                    <h6>Catch guests' attention with a spot title that highlights what makes
                        your place special.</h6>
                    <input
                        type='text'
                        placeholder=' Name of your spot'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='errors'>{errors.name}</div>
                </div>
                <div className='cost'>
                    <h3>Set a base price for your spot</h3>
                    <h6>Competitive pricing can help your listing stand out and rank higher
                        in search results.</h6>
                    <label>
                        <div className='price'>
                            $ <input
                                type='number'
                                placeholder=' Price per night (USD)'
                                min='1'
                                step='1'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className='errors'>{errors.price}</div>
                </div>
                <div className='pic'>
                    <h3>Liven up your spot with photos</h3>
                    <h5>Submit a link to at least one photo to publish your spot.</h5>
                    {/* <input
                        type='text'
                        placeholder=" Preview Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    /> */}
                    <input
                        type="file"
                        multiple
                        placeholder='Preview Image'
                        accept=".jpg, .jpeg, .png"

                        onChange={updateFiles} />

                    <div className='errors'>{errors.previewImage}</div>
                    <div className='errors'>{errors.image}</div>
                    {/* <input
                        type='file'
                        accept=".jpg, .jpeg, .png"

                        onChange={updateFile1} />

                    <div className='errors'>{errors.img1}</div>
                    <input
                        type='file'
                        accept=".jpg, .jpeg, .png"
                        onChange={updateFile2} />
                    <div className='errors'>{errors.img2}</div>
                    <input
                        type='file'
                        accept=".jpg, .jpeg, .png"
                        onChange={updateFile3} />
                    <div className='errors'>{errors.img3}</div> */}
                    {/* <div className='lastimg'>
                        <input
                            type='file'
                            accept=".jpg, .jpeg, .png"
                            onChange={updateFile4} />
                <div className='errors'>{errors.img4}</div>
                    </div> */}
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default CreateSpotForm;
