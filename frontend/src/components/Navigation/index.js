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
                    <div className='nav'>
                        <div className='air'>
                            <li>
                                <NavLink exact to="/">
                                    <i className="fa-brands fa-airbnb"></i>
                                airebnb</NavLink>
                            </li>
                        </div>
                        {isLoaded && (
                            <ul>
                                    <div className='top'>
                                    <div className='new'>
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
