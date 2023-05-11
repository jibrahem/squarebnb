import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpotsOfUserThunk } from "../../store/spots";
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteModal from "../DeleteModal";


export default function ManageSpots () {

    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);

    const spotObj = useSelector(state => state.spots.allSpots)
    const userSpot = useSelector(state=> state.session.user.id)
    const spotList = Object.values(spotObj)
    const newList = spotList.filter((spot) => spot.ownerId === userSpot)
    const ulRef = useRef();

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
                <Link exact to={`/spots/${spot.id}/edit`}>Update</Link>
                </button>
                    <OpenModalMenuItem
                        itemText="Delete"
                        onItemClick={closeMenu}
                        spot={spot}
                        modalComponent={<DeleteModal />}
                    />
            </>


            ))}
            </ul>
            </section>
    );
}
