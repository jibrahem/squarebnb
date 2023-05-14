import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpotsOfUserThunk } from "../../store/spots";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteModal from "../DeleteModal";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './ManageSpot.css'

export default function ManageSpots() {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const spotObj = useSelector(state => state.spots.allSpots)
    const userSpot = useSelector(state => state.session.user.id)
    const spotList = Object.values(spotObj)
    const newList = spotList.filter((spot) => spot.ownerId === userSpot)
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

    return (
        <main>
            <h1>Manage Your Spots</h1>
            <button onClick={create}>
                Create a New Spot
            </button>
            <ul>
                {newList.length > 0 && newList.map(spot => (
                    <div key={spot.id}>
                        <li >
                            <img src={spot.previewImage} alt='house'></img>
                            <div>{spot.city}, {spot.state}</div>
                            <div>${spot.price} night</div>
                            <div>★ {spot.avgRating}</div>
                        </li>
                        <button>
                            <NavLink exact to={`/spots/${spot.id}/edit`}>
                            Update
                            </NavLink>
                        </button>

                        <OpenModalMenuItem
                            buttonText="Delete"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteModal
                                spot={spot}
                            />}
                        />
                    </div>
                ))}
            </ul>
        </main>
    );
}
