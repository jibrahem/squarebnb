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

    if(!spot){
        return null
    }

    if (!reviewObj) {
        return null
    }

    if (!spot.Owner) {
        return null
    }

    console.log('spot', spot)

    const newReviewList = reviewList.filter(review => review.spotId === spot.id);

    console.log('reviewlist', newReviewList)

    if(!user){
        if (newReviewList.length === 0) {
            return (
                <section>
                    <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                        <div>{spot.description}</div>
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
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <div>{spot.description}</div>
                    </div>

                    <ul>
                        <h1>★ {newReviewList.length} review</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <li key={review.id}>
                                <div>{review.User.firstName}</div>
                                <div>{review.review}</div>
                                <div>{review.stars}</div>
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
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <div>{spot.description}</div>
                    </div>

                    <ul>
                        <h1>★ {newReviewList.length} reviews</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <li key={review.id}>
                                <div>{review.User.firstName}</div>
                                <div>{review.review}</div>
                                <div>{review.stars}</div>
                            </li>
                        ))}
                    </ul>
                    </div>
                </section>
            )
        }

    }
        if (user.id !== spot.ownerId ) {
            if (newReviewList.length === 0) {
                return (
                    <section>
                        <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                            <div>{spot.description}</div>
                            </div>
                        <h1>★ New</h1>
                        <OpenModalMenuItem
                            buttonText="Post Your Review"
                            onItemClick={closeMenu}
                            modalComponent={<CreateReviewForm
                            spot={spot}
                            />}
                        />
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
                            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                            <div>{spot.description}</div>
                            </div>
                        <ul>
                            <h1>★ {newReviewList.length} review</h1>
                            {newReviewList.length && newReviewList.map(review => (
                            <div key={review.id}>
                               <li>
                                    <div>{review.User.firstName}</div>
                                    <div>{review.review}</div>
                                    <div>{review.stars}</div>
                                </li>
                                    <OpenModalMenuItem
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                        review={review}
                                        />}
                                    />
                                 </div>
                            ))}
                        </ul>
                        </div>
                    </section>
                )
            } else if (newReviewList.length > 1 && newReviewList[0].userId === user.id){
                return (
                    <section>
                        <div className='box'>
                            <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                            <div>{spot.description}</div>
                            </div>
                        <ul>
                            <h1>★ {newReviewList.length} reviews</h1>
                            {newReviewList.length && newReviewList.map(review => (
                                <li key={review.id}>
                                    <div>{review.User.firstName}</div>
                                    <div>{review.review}</div>
                                    <div>{review.stars}</div>
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
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <div>{spot.description}</div>
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
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <div>{spot.description}</div>
                        </div>
                    <ul>
                        <h1>★ {newReviewList.length} review</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <div key={review.id}>
                           <li>
                                <div>{review.User.firstName}</div>
                                <div>{review.review}</div>
                                <div>{review.stars}</div>
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
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <div>{spot.description}</div>
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
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <div>{spot.description}</div>
                    </div>
                    <ul>
                        <h1>★ {newReviewList.length} review</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <li key={review.id}>
                                <div>{review.User.firstName}</div>
                                <div>{review.review}</div>
                                <div>{review.stars}</div>
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
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/e6e61879358053.5cc08fa80eea0.jpg' alt='house'></img>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <div>{spot.description}</div>
                    </div>
                    <ul>
                        <h1>★ {newReviewList.length} reviews</h1>
                        {newReviewList.length && newReviewList.map(review => (
                            <li key={review.id}>
                                <div>{review.User.firstName}</div>
                                <div>{review.review}</div>
                                <div>{review.stars}</div>
                            </li>
                        ))}
                    </ul>
                        </div>
                </section>
            )
        }
    }






export default SpotShow;
