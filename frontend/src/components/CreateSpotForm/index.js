import SpotForm from '../SpotForm'

const CreateSpotForm = () => {
    const spot = {
        country: '',
        street: '',
        city: '',
        state: '',
        latitude: '',
        longitude: '',
        description: '',
        name: '',
        price: '',
        image: '',
    };

    return (
        <SpotForm
            spot={spot}
            formType='Create a new Spot'
            />
    )
};

export default CreateSpotForm
