import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalMenuItem from './OpenModalMenuItem';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';
import SpotSearchModal from '../SpotSearchModal';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()

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

    if (sessionUser) {
        return (
            <div className='nav-wrap'>
                <header>
                    <div className='nav'>
                        <div className='air'>
                            <li>
                                <NavLink exact to="/">
                                    <i class="fa-solid fa-square"></i> squarebnb</NavLink>
                            </li>
                        </div>
                        {isLoaded && (
                            <ul>
                                <div className='top'>
                                    <div className='new'>
                                        <OpenModalMenuItem
                                            itemText="Search Spots"
                                            onItemClick={closeMenu}
                                            modalComponent={<SpotSearchModal
                                                />}
                                        />
                                        <NavLink exact to='/spots/new'>
                                            Create a New Spot
                                        </NavLink>
                                    </div>
                                    <div className='profile'>
                                        <li>
                                            <ProfileButton user={sessionUser} />
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        )}
                    </div>
                </header>
            </div>
        );
    } else {
        return (
            <div className='nav-wrap'>
                <ul className='nav'>
                    <div className='air'>
                        <li>
                            <NavLink exact to="/">
                                <i class="fa-solid fa-square"></i> squarebnb</NavLink>
                        </li>
                    </div>
                    <div className='top'>
                        <OpenModalMenuItem
                            itemText="Search Spots"
                            onItemClick={closeMenu}
                            modalComponent={<SpotSearchModal
                            />}
                        />
                        {isLoaded && (
                            <li>
                                <ProfileButton user={sessionUser} />
                            </li>
                        )}
                    </div>
                </ul>
            </div>
        );
    }

}

export default Navigation;
