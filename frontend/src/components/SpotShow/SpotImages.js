import React from "react"

function SpotImages({spot}){

    if (!spot.SpotImages[1].url) {
        return (
            <div className='images'>
                <div className='img1'>
                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                </div>
                <div className='img2'>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                </div>
            </div>
        )
    }
     if (!spot.SpotImages[2].url) {
        return (
            <div className='images'>
                <div className='img1'>
                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                </div>
                <div className='img2'>
                    <img src={spot.SpotImages[1].url} alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                </div>
            </div>
        )
    }
    if (!spot.SpotImages[3].url) {
        return (
            <div className='images'>
                <div className='img1'>
                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                </div>
                <div className='img2'>
                    <img src={spot.SpotImages[1].url} alt='house'></img>
                    <img src={spot.SpotImages[2].url} alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                </div>
            </div>
        )
    }
    if (!spot.SpotImages[4].url) {
        return (
            <div className='images'>
                <div className='img1'>
                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                </div>
                <div className='img2'>
                    <img src={spot.SpotImages[1].url} alt='house'></img>
                    <img src={spot.SpotImages[2].url} alt='house'></img>
                    <img src={spot.SpotImages[3].url} alt='house'></img>
                    <img src='https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg' alt='house'></img>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='images'>
                <div className='img1'>
                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
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

}
export default SpotImages
