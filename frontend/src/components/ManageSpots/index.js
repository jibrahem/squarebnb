import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpotsOfUserThunk } from "../../store/spots";

export default function ManageSpots () {

    const dispatch = useDispatch()

    const spotObj = useSelector(state => state.spots.allSpots)
    const spotList = Object.values(spotObj)

    useEffect(() => {
        dispatch(allSpotsOfUserThunk())
    }, [dispatch])
    return (
        <section>
            <h1>Manage Your Spots</h1>
            {spotList.length > 0 && spotList.map(spot => (
                <li key={spot.id}>
                 <img src={spot.previewImage} alt='house'></img>
                 <div>{spot.city}, {spot.state}</div>
                 <div>{spot.price} night</div>
                 <div>{spot.avgRating}</div>
                </li>
            ))}
            </section>
    );
}
