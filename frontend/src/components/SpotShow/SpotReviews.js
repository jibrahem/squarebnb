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
                <ul>
                    {newReviewList.length && newReviewList.map(review => (
                        <li key={review.id}>
                            <div>{review.User?.firstName}</div>
                            {review.createdAt.split('-')[1] === '01' &&
                                <div> Jan {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '02' &&
                                <div> Feb {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '03' &&
                                <div> March {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '04' &&
                                <div> April {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '05' &&
                                <div> May {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '06' &&
                            <div> June {review.createdAt.split('-')[0]}
                            </div>
                            }
                            {review.createdAt.split('-')[1] === '07' &&
                            <div> July {review.createdAt.split('-')[0]}
                            </div>
                            }
                            {review.createdAt.split('-')[1] === '08' &&
                            <div> Aug {review.createdAt.split('-')[0]}
                            </div>
                            }
                            {review.createdAt.split('-')[1] === '09' &&
                            <div> Sept {review.createdAt.split('-')[0]}
                            </div>
                            }
                            {review.createdAt.split('-')[1] === '10' &&
                            <div> Sept {review.createdAt.split('-')[0]}
                            </div>
                            }
                            {review.createdAt.split('-')[1] === '11' &&
                            <div> Nov {review.createdAt.split('-')[0]}
                            </div>
                            }
                            {review.createdAt.split('-')[1] === '12' &&
                            <div> Dec {review.createdAt.split('-')[0]}
                            </div>
                            }
                            <div>{review.review}</div>
                            {userReview && userId && review.userId === userId &&
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                            review={review}
                                            spot={spot}
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
                <ul>
                    {newReviewList.length && newReviewList.map(review => (
                        <li key={review.id}>
                            <div>{review.User?.firstName}</div>
                            {review.createdAt.split('-')[1] === '01' &&
                                <div> Jan {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '02' &&
                                <div> Feb {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '03' &&
                                <div> March {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '04' &&
                                <div> April {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '05' &&
                                <div> May {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '06' &&
                                <div> June {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '07' &&
                                <div> July {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '08' &&
                                <div> Aug {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '09' &&
                                <div> Sept {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '10' &&
                                <div> Sept {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '11' &&
                                <div> Nov {review.createdAt.split('-')[0]}
                                </div>
                            }
                            {review.createdAt.split('-')[1] === '12' &&
                                <div> Dec {review.createdAt.split('-')[0]}
                                </div>
                            }
                            <div>{review.review}</div>

                            {userReview && userId && review.userId === userId &&
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                            review={review}
                                            spot={spot}
                                        />}
                                    />

                                </div>
                            }
                        </li>
                    ))
                    }
                </ul>
            </>
        )
    }

}
export default SpotReviews
