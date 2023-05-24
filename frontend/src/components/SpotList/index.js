import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpotsThunk } from '../../store/spots';
import { Link } from 'react-router-dom';
import './SpotList.css'

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

    if(!spotList){
      return null
    }

    //show data on page through return jsx, map through list of spot
    return (
      <main>
        <ul>
      {spotList.length > 0 && spotList.map(spot => (
        <div key={spot.id} className='spot' title={spot.name}>
          <Link to={`/spots/${spot.id}`}>
            <div className='image'>
              <img src={spot.previewImage} alt='home'/>
            </div>
            <div className='list'>
              <div className='star'>
          <li>{spot.city}, {spot.state}</li>
            <li>★ {spot?.avgRating || ('New')}</li>
              </div>
          <li>${spot.price} night</li>
              </div>
          </Link>
          </div>
      ))}
      </ul>
      </main>
    )
}
