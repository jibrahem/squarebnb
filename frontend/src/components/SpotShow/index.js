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

    console.log('spot in spot show', spot)

    const reviewList = Object.values(reviewObj);

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(allReviewsThunk(spotId))
        dispatch(getOneSpotThunk(spotId))
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

    const reserve = () => {
        window.alert('Feature Coming Soon...')
    }

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
        if (newReviewList.length === 0) {
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
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            <div>★ New</div>
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>
                            </div>
                            <h1>★ New</h1>
                        </div>
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
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>

                            </div>
                            {newReviewList.length === 1 &&
                                <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                            }
                            {newReviewList.length > 1 &&
                                <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                            }
                            <SpotReviews
                                spot={spot}
                                newReviewList={newReviewList}
                                userReview={userReview}
                            />
                        </div>
                    </div>
                </section>
            )
        }
    }

    if (userId !== spot.ownerId) {
        if (!userReview && userId && newReviewList.length === 0) {
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
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            <div>★ New</div>
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='new-post'>
                            <h1>★ New</h1>
                            <div className='modal'>
                                <OpenModalMenuItem
                                    buttonText="Post Your Review"
                                    onItemClick={closeMenu}
                                    modalComponent={<CreateReviewForm
                                        spot={spot}
                                    />}
                                />
                                <h4>Be the first to post a review!</h4>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        if (!userReview && userId && newReviewList.length > 0) {
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
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>

                                </div>
                            </div>
                            {newReviewList.length === 1 &&
                                <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                            }
                            {newReviewList.length > 1 &&
                                <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                            }
                            <div className='new-post'>
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Post Your Review"
                                        onItemClick={closeMenu}
                                        modalComponent={<CreateReviewForm
                                            spot={spot}
                                        />}
                                    />
                                </div>
                            </div>
                        </div>
                        <SpotReviews
                            spot={spot}
                            newReviewList={newReviewList}
                            userReview={userReview}
                        />
                    </div>
                </section>
            )
        }
        if (!userReview && userId && newReviewList.length > 0) {
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
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>

                                {newReviewList.length === 1 &&
                                    <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                                }
                                {newReviewList.length > 1 &&
                                    <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                                }

                            </div>
                            <div className='new-post'>
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Post Your Review"
                                        onItemClick={closeMenu}
                                        modalComponent={<CreateReviewForm
                                            spot={spot}
                                        />}
                                    />
                                </div>
                            </div>
                        </div>
                        <SpotReviews
                            spot={spot}
                            newReviewList={newReviewList}
                            userReview={userReview}
                        />
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
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 0 &&
                                                <div>★ New</div>
                                            }
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>
                            </div>
                                {newReviewList.length === 1 &&
                                    <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                                }
                                {newReviewList.length > 1 &&
                                    <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                                }
                                <SpotReviews
                                    spot={spot}
                                    newReviewList={newReviewList}
                                    userReview={userReview}
                                    userId={userId}
                                />
                        </div>
                    </div>
                </section>
            )
        }
    }
    else if (userId === spot.ownerId) {
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
                            <div className="review">
                                <div className='reserve'>
                                    <div className='money'>
                                        <div>$ {spot.price} night</div>
                                        {newReviewList.length === 0 &&
                                            <div>★ New</div>
                                        }
                                        {newReviewList.length === 1 &&
                                            <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                        }
                                        {newReviewList.length > 1 &&
                                            <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                        }
                                    </div>
                                    <button onClick={reserve}>Reserve</button>
                                </div>
                            </div>
                        </div>
                        {newReviewList.length === 0 &&
                            <h1>★ New</h1>
                        }
                        {newReviewList.length === 1 &&
                            <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                        }
                        {newReviewList.length > 1 &&
                            <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                        }
                        {newReviewList.length > 0 &&
                        <SpotReviews
                            spot={spot}
                            newReviewList={newReviewList}
                            userReview={userReview}
                            userId={userId}
                        />
                        }
                    </div>
                </div>
            </section>
        )
    }
}


export default SpotShow;
