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

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId));
    }, [dispatch, spotId]);

    if (!spot) return null;

    if (spot.id === spotId) {
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
