import React from "react";
import DeleteReview from "../DeleteReview";
import OpenModalMenuItem from '../OpenModalButton'
import { useEffect, useRef, useState } from "react";


const SpotReviews = ({ spot, newReviewList, userReview, userId }) => {

    const reserve = () => {
        window.alert('Feature Coming Soon...')
    }

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    if (!newReviewList) {
        return null
    }

    if (newReviewList.length === 0) {
        return (
            <>
                <div className="review">
                    <div className='reserve'>
                        <div className='money'>
                            <div>$ {spot.price} night</div>
                            <div>★ New</div>
                        </div>
                        <button onClick={reserve}>Reserve</button>
                    </div>
                </div>
                <h1>★ New</h1>
            </>
        )
    } else if (newReviewList.length === 1) {
        return (
            <>
                <div className="review">
                    <div className='reserve'>
                        <div className='money'>
                            <div>$ {spot.price} night</div>
                            <div>★ {spot.avgStarRating} · {spot.numReviews} review</div>
                        </div>
                        <button onClick={reserve}>Reserve</button>
                    </div>
                </div>
                <ul>
                    <h1>★ {spot.avgStarRating} · {newReviewList.length} review</h1>
                    {newReviewList.length && newReviewList.map(review => (
                        <li key={review.id}>
                            <div>{review.User?.firstName}</div>
                            <div>{review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                            <div>{review.review}</div>
                            {userReview && userId && review.userId === userId &&
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                            review={review}
                                        />}
                                    />
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </>

        )
    }
    else {
        return (
            <>
                <div className="review">
                    <div className='reserve'>
                        <div className='money'>
                            <div>$ {spot.price} night</div>
                            <div>★ {spot.avgStarRating} · {spot.numReviews} reviews</div>
                        </div>
                        <button onClick={reserve}>Reserve</button>
                    </div>
                </div>
                <ul>
                    <h1>★ {spot.avgStarRating} · {newReviewList.length} reviews</h1>
                    {newReviewList.length && newReviewList.map(review => (
                        <li key={review.id}>
                            <div>{review.User?.firstName}</div>
                            <div>{review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                            <div>{review.review}</div>
                            {userReview && userId && review.userId === userId &&
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                            review={review}
                                        />}
                                    />
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </>
        )
    }

}
export default SpotReviews
