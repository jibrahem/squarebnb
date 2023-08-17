import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allBookingsOfUserThunk } from '../../store/bookings'
import OpenModalMenuItem from '../OpenModalButton'
import DeleteBooking from "../DeleteBooking"
import './ManageBookings.css';
import EditBookingForm from "../EditBookingForm"

export default function ManageBookings() {
    const dispatch = useDispatch()
    const bookingObj = useSelector(state => state.bookings.user)
    const user = useSelector(state => state.session.user)
    const list = Object.values(bookingObj)

    const bookingList = list.filter((booking) => booking.userId === user.id)

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(allBookingsOfUserThunk())
    }, [dispatch])

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

    if (!bookingList) {
        return null
    }


    return (
        <>
            <div className="manage-bookings">
                <div className="manages">
                    <h1>Manage Bookings</h1>
                </div>
                <ul>
                    {bookingList.length > 0 && bookingList.map(booking => (
                        <div key={booking.id} className="review">
                            <h3>{booking.Spot?.name}</h3>
                            <div>${(((new Date(booking.endDate).getTime()) - (new Date(booking.startDate).getTime())) / (1000 * 3600 * 24)) * booking.Spot.price}</div>
                            <div className="date">
                                <h4>Start: {booking.startDate}</h4>
                                <h4>End: {booking.endDate}</h4>
                            </div>
                            <div className="buttons">
                                <OpenModalMenuItem
                                    buttonText="Update"
                                    onItemClick={closeMenu}
                                    modalComponent={<EditBookingForm
                                        booking={booking}
                                        spot={booking.Spot}
                                    />}
                                />
                                <OpenModalMenuItem
                                    buttonText="Delete"
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteBooking
                                        booking={booking}
                                    />}
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}
