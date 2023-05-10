import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpotsOfUserThunk } from "../../store/spots";
import { NavLink } from 'react-router-dom';

export default function ManageSpots () {

    const dispatch = useDispatch()

    const spotObj = useSelector(state => state.spots.allSpots)
    const userSpot = useSelector(state=> state.session.user.id)
    const spotList = Object.values(spotObj)
    const newList = spotList.filter((spot) => spot.ownerId === userSpot)

    useEffect(() => {
        dispatch(allSpotsOfUserThunk())
    }, [dispatch])

    return (
        <section>
            <h1>Manage Your Spots</h1>
            <button>
                <NavLink exact to='/spots/new'>Create a New Spot</NavLink></button>
            <ul>
            {newList.length > 0 && newList.map(spot => (
                <>
                <li key={spot.id}>
                 <img src={spot.previewImage} alt='house'></img>
                 <div>{spot.city}, {spot.state}</div>
                 <div>{spot.price} night</div>
                 <div>{spot.avgRating}</div>
                </li>
                 <button>
                <NavLink exact to={`/spots/${spot.id}/edit`}>Update</NavLink>
                </button>
            <button>Delete</button>
            </>
            ))}
            </ul>
            </section>
    );
}
