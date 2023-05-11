import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spots";
import SpotForm from "../SpotForm";

const EditSpotForm = () => {
    let { spotId } = useParams();
    spotId = Number(spotId);

    const spot = useSelector((state) => state.spots.singleSpot);
    const dispatch = useDispatch();

    console.log('EDITSPOTID', spotId)
    console.log('EDITSPOT', spot)

    useEffect(() => {
        console.log('SPOTIDDDDD', spotId)
        dispatch(getOneSpotThunk(spotId));
    }, [dispatch, spotId]);

    if(!spot) return null;

 if(spot.id === spotId){
    return (
        Object.keys(spot).length > 1 && (
         <>
            <SpotForm
            spot={spot}
            formType="Update your Spot"
            />
            </>
        )
    )
}
}

export default EditSpotForm;
