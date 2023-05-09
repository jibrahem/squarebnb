import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotThunk } from '../../store/spots';

const SpotShow = () => {
    let { spotId } = useParams();
    spotId = Number(spotId)
    const spot = useSelector((state) => state.spots.singleSpot);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch, spotId]);

    return (
        <section>
       <h1>{spot.name}</h1>
       <div>{spot.city}, {spot.state}, {spot.country}</div>
       <img src={spot.previewImage} alt='house'></img>
       {/* <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2> */}
    </section>
)

}

export default SpotShow;
