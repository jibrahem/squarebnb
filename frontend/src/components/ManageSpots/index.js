import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpotsOfUserThunk } from "../../store/spots";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteModal from "../DeleteModal";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import './ManageSpot.css'

export default function ManageSpots() {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const spotObj = useSelector(state => state.spots.allSpots)
    const user = useSelector(state => state.session.user)
    const spotList = Object.values(spotObj)
    const newList = spotList.filter((spot) => spot.ownerId === user.id)
    const ulRef = useRef();
    const history = useHistory()

    useEffect(() => {
        dispatch(allSpotsOfUserThunk())
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const create = () => {
        history.push('/spots/new')
    }

    if(!newList){
        return null
    }

    return (
        <main>
            <div className="manage">
                <h1>Manage Your Spots</h1>
                <button onClick={create}>
                    Create a New Spot
                </button>
            </div>
            <ul>
                {newList.length > 0 && newList.map(spot => (
                    <div key={spot.id} className="spot">
                        <Link to={`/spots/${spot.id}`}>
                            <div className="image">
                                <img src={spot.previewImage} alt='house'></img>
                            </div>
                            <div className='list'>
                                <div className='star'>
                                    <li>{spot.city}, {spot.state}</li>
                                    <li>★ {spot.avgRating}</li>
                                </div>
                                <li>${spot.price} night</li>
                            </div>
                        </Link>
                        <div className="buttons">
                            <button onClick={() => history.push(`/spots/${spot.id}/edit`)}>
                                Update
                            </button>

                            <OpenModalMenuItem
                                buttonText="Delete"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteModal
                                    spot={spot} />}
                            />
                        </div>
                    </div>
                ))}
            </ul>
        </main>
    );
}
