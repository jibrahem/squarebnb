import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) {
        return (
            <div className='nav-wrap'>
                <header>
                    <ul className='nav'>
                        <div className='air'>
                            <li>
                                <NavLink exact to="/"> airebnb</NavLink>
                            </li>
                        </div>
                        {isLoaded && (
                            <div className='top'>
                                <ul>
                                    <li><NavLink exact to='/spots/new'>
                                        Create a New Spot
                                    </NavLink>
                                    </li>
                                    <li>
                                        <ProfileButton user={sessionUser} />
                                    </li>
                                </ul>
                            </div>
                        )}
                    </ul>
                </header>
            </div>
        );
    } else {
        return (
            <div className='nav-wrap'>
                <ul className='nav'>
                    <div className='air'>
                        <li>
                            <NavLink exact to="/">airebnb</NavLink>
                        </li>
                    </div>
                    {isLoaded && (
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }

}

export default Navigation;
