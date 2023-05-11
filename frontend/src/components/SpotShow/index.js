import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotThunk } from '../../store/spots';
import './SpotShow.css';

const SpotShow = () => {
    let { spotId } = useParams();
    spotId = Number(spotId)
    const spot = useSelector((state) => state.spots.singleSpot);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch, spotId]);

    if(spot.id === spotId){
        if(!spot.Owner){
            return null
        }

        return (
        <section>
            <div className='spot-box'>
           <h1>{spot.name}</h1>
           <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
           <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            </div>
        </section>
    )
        }
    }





export default SpotShow;
