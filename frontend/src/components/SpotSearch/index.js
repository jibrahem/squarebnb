import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { searchSpotsThunk } from "../../store/spots"
import { useState } from "react"
import './SpotSearch.css'
import { useHistory } from "react-router-dom"

const SpotSearchModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [minLat, setMinLat] = useState(-90);
    const [maxLat, setMaxLat] = useState(90);
    const [minLng, setMinLng] = useState(-180);
    const [maxLng, setMaxLng] = useState(180);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [errors, setErrors] = useState({})
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const query = `?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}&minPrice=${minPrice}&maxPrice=${maxPrice}`

        const spots = await dispatch(searchSpotsThunk(query))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                } else{
                    history.push(`/spots/query`)
                }
            });
    }

    return (
        <div className="search-form">
            <form onSubmit={handleSubmit}>
                <h1>Search Spots</h1>
                <label>
                    Minimum Latitude
                    <div className='errors'>{errors.minLat}</div>
                    <input
                        type='number'
                        placeholder='Minimum latitude'
                        min='-90'
                        max='90'
                        step='any'
                        value={minLat}
                        onChange={(e) => setMinLat(e.target.value)}
                    />
                </label>
                <label>
                    Maximum Latitude
                    <div className='errors'>{errors.maxLat}</div>

                    <div className='maxlat-input'>
                        <div className='comma'>
                            <input
                                type='number'
                                placeholder='Maximum latitude'
                                min='-90'
                                max='90'
                                step='any'
                                value={maxLat}
                                onChange={(e) => setMaxLat(e.target.value)}
                            />
                        </div>
                    </div>
                </label>
                <label>
                    Minimum Longitude
                    <div className='errors'>{errors.minLng}</div>
                    <div className='minlng-input'>
                        <input
                            type='number'
                            step='any'
                            min='-180'
                            max='180'
                            placeholder='Minimum longitude'
                            value={minLng}
                            onChange={(e) => setMinLng(e.target.value)}
                        />
                    </div>
                </label>
                <label>

                    Maximum Longitude
                    <div className='errors'>{errors.maxLng}</div>

                    <div className='maxlng-input'>
                        <input
                            type='number'
                            step='any'
                            min='-180'
                            max='180'
                            placeholder='Maximum longitude'
                            value={maxLng}
                            onChange={(e) => setMaxLng(e.target.value)}
                        />
                    </div>
                </label>
                <label>
                    <div className='minPrice'>
                        Minimum Price <input
                            type='number'
                            placeholder='Min Price'
                            step='1'
                            min='1'
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                </label>
                <div className='errors'>{errors.minPrice}</div>
                <label>
                    <div className='maxPrice'>
                        Maximum Price <input
                            type='number'
                            placeholder='Max Price'
                            step='1'
                            min='1'
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </label>
                <div className='errors'>{errors.minPrice}</div>

                <div className="buttons">
                    <button onSubmit={handleSubmit}>Submit Search</button>
                </div>
            </form>
        </div>

    )
}

export default SpotSearchModal
