import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpotsThunk } from '../../store/spots';
import { Link } from 'react-router-dom';
//build a component
//route in the backend to grab spots
//backened will send array of objects

//component
//dispatch to fetch data and put it in the store
//useSelector grabs data fromthe store and give component access to data

export default function SpotList(){

    //convert spots obj to list
    //normalize spot data
    const dispatch = useDispatch()
    const spotObj = useSelector(state => state.spots.allSpots)
    const spotList = Object.values(spotObj)

    //useEffect to trigger dipatch of thunk
    useEffect(() => {
        dispatch(allSpotsThunk())
    }, [dispatch])

    //show data on page through return jsx, map through list of spot
    return (
      <div>
      {spotList.length > 0 && spotList.map(spot => (
        <div className='spots'>
        <li key={spot.id}>
          <Link to={`spots/${spot.id}`}>
          <img src={spot.previewImage} alt='home'/>
          <div className='from'>{spot.city}, {spot.state}</div>
          <p>${spot.price} night</p>
          <p>{spot.avgRating}</p>
          </Link>
        </li>
        </div>
      ))}
      </div>
    )
}
