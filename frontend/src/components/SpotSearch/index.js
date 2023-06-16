import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { searchSpotsThunk } from "../../store/spots";
import { useParams, Link } from "react-router-dom";


const SpotSearch = () => {
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots.allSpots)
    const spotList = Object.values(spotObj)
   const query = useParams()
    console.log('query', query)

    console.log('spots', spotList)

    useEffect(() => {
        dispatch(searchSpotsThunk(query))
    }, [dispatch, query])

    if (!spotList) {
        return null
    }

    return (
        <>
            <main>
                <ul>
                    {spotList.length > 0 && spotList.map(spot => (
                        <div key={spot.id} className='spot' title={spot.name}>
                            <Link to={`/spots/${spot.id}`}>
                                <div className='image'>
                                    <img src={spot.previewImage} alt='home' />
                                </div>
                                <div className='list'>
                                    <div className='star'>
                                        <li>{spot.city}, {spot.state}</li>
                                        {!spot.avgRating &&
                                            <li>★ New</li>
                                        }
                                        {spot.avgRating &&
                                            <li>★ {spot?.avgRating.toFixed(1)}</li>
                                        }
                                    </div>
                                    <li>${spot.price} night</li>
                                </div>
                            </Link>
                        </div>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default SpotSearch
