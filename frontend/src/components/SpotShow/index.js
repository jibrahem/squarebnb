import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotThunk } from '../../store/spots';
import { allReviewsThunk } from '../../store/reviews';
import CreateReviewForm from '../CreateReviewForm';
import OpenModalMenuItem from '../OpenModalButton'
import DeleteReview from '../DeleteReview';
import './SpotShow.css';

const SpotShow = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = Number(spotId)
    const spot = useSelector(state => state.spots.singleSpot);
    const reviewObj = useSelector(state => state.reviews.spot);
    const user = useSelector(state => state.session.user)
    const reviewList = Object.values(reviewObj);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch, spotId]);


    useEffect(() => {
        dispatch(allReviewsThunk(spotId))
    }, [dispatch, spotId])

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

    const reserve = () => {
        window.alert('Feature Coming Soon...')
    }

    const newReviewList = reviewList.filter(review => review.spotId === spot.id);

    if (!newReviewList) {
        return null
    }

    if (!user) {
        if (newReviewList.length === 0) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <div className='images'>
                                <div className='img1'>
                                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                                </div>
                                <div className='img2'>
                                    <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                            </div>
                            </div>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                    <div>{spot.description}</div>
                                </div>
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
                </section>
            )
        }

        if (newReviewList.length === 1) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <div className='images'>
                                <div className='img1'>
                                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                                </div>
                                <div className='img2'>
                                    <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                                </div>
                            </div>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                    <div>{spot.description}</div>
                                </div>
                                <div className='reserve'>
                                    <div className='money'>
                                    <div>$ {spot.price} night</div>
                                    <div>★ {spot.avgStarRating} · {spot.numReviews} review</div>
                                    </div>
                                    <button onClick={reserve}>Reserve</button>
                                </div>
                            </div>
                        </div>

                        <ul>
                            <h1>★ {spot.avgStarRating} · {newReviewList.length} review</h1>
                            {newReviewList.length && newReviewList.map(review => (
                                <li key={review.id}>
                                    <div>{review.User.firstName}</div>
                                    <div>{review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                                    <div>{review.review}</div>
                                </li>
                            ))}
                        </ul>
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
                            <div className='images'>
                                <div className='img1'>
                                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                                </div>
                                <div className='img2'>
                                    <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                                </div>
                            </div>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                    <div>{spot.description}</div>
                                </div>
                                <div className='reserve'>
                                    <div className='money'>
                                    <div>$ {spot.price} night</div>
                                    <div>★ {spot.avgStarRating} · {spot.numReviews} reviews</div>
                                    </div>
                                    <button onClick={reserve}>Reserve</button>
                                </div>
                            </div>
                        </div>

                        <ul>
                            <h1>★ {spot.avgStarRating} · {newReviewList.length} reviews</h1>
                            {newReviewList.length && newReviewList.map(review => (
                                <li key={review.id}>
                                    <div>{review.User.firstName}</div>
                                    <div>{review.createdAt.split('-')[1]} {review.createdAt.split('-')[0]}</div>
                                    <div>{review.review}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )
        }

    }
    if (user.id !== spot.ownerId) {
        if (newReviewList.length === 0) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <div className='images'>
                                <div className='img1'>
                                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                                </div>
                                <div className='img2'>
                                    <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                                </div>
                            </div>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                    <div>{spot.description}</div>
                                </div>
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
                        <h5>Be the first to post a review!</h5>
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
                </section>
            )
        } else if (newReviewList.length === 1 && newReviewList[0].userId === user.id) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <div className='images'>
                                <div className='img1'>
                                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                                </div>
                                <div className='img2'>
                                    <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                                </div>
                            </div>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                    <div>{spot.description}</div>
                                </div>
                                <div className='reserve'>
                                    <div className='money'>
                                    <div>$ {spot.price} night</div>
                                    <div>★ {spot.avgStarRating} · {spot.numReviews} review</div>
                                    </div>
                                    <button onClick={reserve}>Reserve</button>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <h1>★ {spot.avgStarRating} · {spot.numReviews} review</h1>
                            {newReviewList.length && newReviewList.map(review => (
                                <div key={review.id}>
                                    <li>
                                        <div>{review?.User?.firstName}</div>
                                        <div>{review.review}</div>

                                    </li>
                                    <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                            review={review}
                                        />}
                                    />
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </section>
            )
        }
        else if (newReviewList.length === 1 && newReviewList[0].userId !== user.id) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <div className='images'>
                                <div className='img1'>
                                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                                </div>
                                <div className='img2'>
                                    <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                                </div>
                            </div>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                    <div>{spot.description}</div>
                                </div>
                                <div className='reserve'>
                                    <div className='money'>
                                    <div>$ {spot.price} night</div>
                                    <div>★ {spot.avgStarRating} · {spot.numReviews} review</div>
                                    </div>
                                    <button onClick={reserve}>Reserve</button>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <h1>★ {spot.avgStarRating} · {spot.numReviews} review</h1>
                            {newReviewList.length && newReviewList.map(review => (
                                <div key={review.id}>
                                    <li>
                                        <div>{review?.User?.firstName}</div>
                                        <div>{review.review}</div>

                                    </li>
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
                            ))}
                        </ul>
                    </div>
                </section>
            )

        } else if (newReviewList.length > 1) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <div className='images'>
                                <div className='img1'>
                                    <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                                </div>
                                <div className='img2'>
                                    <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                    <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                                </div>
                            </div>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                    <div>{spot.description}</div>
                                </div>
                                <div className='reserve'>
                                    <div className='money'>
                                    <div>$ {spot.price} night</div>
                                    <div>★ {spot.avgStarRating} · {spot.numReviews} reviews</div>
                                   </div>
                                    <button onClick={reserve}>Reserve</button>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <h1>★ {spot.avgStarRating} · {spot.numReviews} reviews</h1>
                            {newReviewList.length && newReviewList.map(review => (
                                <li key={review.id}>
                                    <div>{review?.User?.firstName}</div>
                                    <div>{review.review}</div>
                                    {/* <OpenModalMenuItem
                                        disabled={isDisabled}
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                            review={review}
                                        />}
                                    /> */}

                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )
        }
    } else if (newReviewList.length === 0) {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <div className='images'>
                            <div className='img1'>
                                <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                            </div>
                            <div className='img2'>
                                <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                            </div>
                        </div>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                <div>{spot.description}</div>
                            </div>
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
            </section>
        )
    }
    else if (newReviewList.length === 1) {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <div className='images'>
                            <div className='img1'>
                                <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                            </div>
                            <div className='img2'>
                                <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                            </div>
                        </div>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                <div>{spot.description}</div>
                            </div>
                            <div className='reserve'>
                                <div className='money'>
                                <div>$ {spot.price} night</div>
                                <div>★ {spot.avgStarRating} · {spot.numReviews} review</div>
                                </div>
                                <button onClick={reserve}>Reserve</button>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <h1>★ {spot.avgStarRating} · {spot.numReviews} review</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <div key={review.id}>
                                <li>
                                    <div>{review?.User?.firstName}</div>
                                    <div>{review.review}</div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </section>
        )
    }
    if (newReviewList.length === 0) {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <div className='images'>
                            <div className='img1'>
                                <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                            </div>
                            <div className='img2'>
                                <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                            </div>
                        </div>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                <div>{spot.description}</div>
                            </div>
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
                    <ul>
                        <button>Post Your Review</button>
                        <div>Be the first to post a review!</div>
                    </ul>
                </div>
            </section>
        )
    }

    if (newReviewList.length === 1) {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <div className='images'>
                            <div className='img1'>
                                <img src={spot?.SpotImages[0]?.url} alt='house'></img>
                            </div>
                            <div className='img2'>
                                <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                            </div>
                        </div>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                <div>{spot.description}</div>
                            </div>
                            <div className='reserve'>
                                <div className='money'>
                                <div>$ {spot.price} night</div>
                                <div>★ {spot.avgStarRating} · {spot.numReviews} review</div>
                                </div>
                                <button onClick={reserve}>Reserve</button>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <h1>★ {spot.avgStarRating} · {spot.numReviews} review</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <li key={review.id}>
                                <div>{review?.User?.firstName}</div>
                                <div>{review.review}</div>

                            </li>
                        ))}
                    </ul>
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
                        <div className='images'>
                            <div className='img1'>
                                <img src={spot?.SpotImages[0].url} alt='house'></img>
                            </div>
                            <div className='img2'>
                                <img src={spot?.SpotImages[1]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[2]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[3]?.url} alt='house'></img>
                                <img src={spot?.SpotImages[4]?.url} alt='house'></img>
                            </div>
                        </div>
                        <div className='reserve-wrap'>
                            <div className='host'>
                                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                                <div>{spot.description}</div>
                            </div>
                            <div className='reserve'>
                                <div className='money'>
                                <div>$ {spot.price} night</div>
                                <div>★ {spot.avgStarRating} · {spot.numReviews} reviews</div>
                                </div>
                                <button onClick={reserve}>Reserve</button>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <h1>★ {spot.avgStarRating} · {spot.numReviews} reviews</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <li key={review.id}>
                                <div>{review?.User?.firstName}</div>
                                <div>{review.review}</div>

                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        )
    }
}






export default SpotShow;
