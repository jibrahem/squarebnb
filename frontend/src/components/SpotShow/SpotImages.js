import React from "react"

function SpotImages({ spot }) {
    return (
        <div className='images'>
            <div className='img1'>
                <img src={spot.SpotImages[0].url} alt='house'></img>
            </div>
            <div className='img2'>
                <img src={spot.SpotImages[1].url} alt='house'></img>
                <img src={spot.SpotImages[2].url} alt='house'></img>
                <img src={spot.SpotImages[3].url} alt='house'></img>
                <img src={spot.SpotImages[4].url} alt='house'></img>
            </div>
        </div>
    )
}


export default SpotImages
