import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotThunk } from '../../store/spots';
import { allReviewsThunk } from '../../store/reviews';
import CreateReviewForm from '../CreateReviewForm';
import OpenModalMenuItem from '../OpenModalButton'
import './SpotShow.css';
import SpotImages from './SpotImages';
import SpotReviews from './SpotReviews';

const SpotShow = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = Number(spotId)

    const spot = useSelector(state => state.spots.singleSpot);
    const userId = useSelector(state => state.session.user?.id)
    const reviewObj = useSelector(state => state.reviews.spot);

    const reviewList = Object.values(reviewObj);

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
        dispatch(allReviewsThunk(spotId))
    }, [dispatch, spotId]);


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

    if (!spot) {
        return null
    }

    if (!reviewObj) {
        return null
    }

    if (!spot.Owner) {
        return null
    }

    const newReviewList = reviewList.filter(review => review.spotId === spot.id);

    const [userReview] = newReviewList.filter(review => review.userId === userId)

    if (!newReviewList) {
        return null
    }

    if (!userId) {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <SpotImages
                            spot={spot}
                        />
                        <div className='reserve-box'>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                <div>{spot.description}</div>
                            </div>
                        </div>
                        <SpotReviews
                            spot={spot}
                            newReviewList={newReviewList}
                        />
                    </div>
                    </div>
                </div>
            </section>
        )
    }

    if (userId !== spot.ownerId) {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <SpotImages
                            spot={spot}
                        />
                        <div className='reserve-box'>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                <div>{spot.description}</div>
                            </div>
                        </div>
                        {!userReview && userId &&
                            <SpotReviews
                                spot={spot}
                                newReviewList={newReviewList}
                                userReview={userReview}
                            />}
                        </div>
                    </div>
                    {!userReview && userId &&
                        <>
                            <div className='modal'>
                                <OpenModalMenuItem
                                    buttonText="Post Your Review"
                                    onItemClick={closeMenu}
                                    modalComponent={<CreateReviewForm
                                        spot={spot}
                                    />}
                                />
                            </div>
                            {!newReviewList.length &&
                                <div>Be the first to post a review!</div>
                            }
                        </>
                    }  {userReview && userId &&
                        <>
                            <SpotReviews
                                spot={spot}
                                newReviewList={newReviewList}
                                userReview={userReview}
                                userId={userId}
                            />
                        </>
                    }
                </div>
            </section>
        )
    }
    else {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <SpotImages
                            spot={spot}
                        />
                        <div className='reserve-box'>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                <div>{spot.description}</div>
                            </div>
                        </div>
                        <SpotReviews
                            spot={spot}
                            newReviewList={newReviewList}
                            userReview={userReview}
                        />
                    </div>
                </div>
                </div>
            </section>
        )
    }
}

export default SpotShow;
