
import React, { useContext, useEffect } from 'react';
//styles
import "./Bookings.css";
//contexts
import { BookingsContext } from '../../contexts/AllContexts';
//components
import ResultCard from '../ResultCard/ResultCard';

const Bookings = () => {
    //contexts
    const [bookings, setBookings] = useContext(BookingsContext);
    //functions
    const displayCards = () => {
        if(bookings?.length == 0) return null;

        return bookings.map((item, index) => {
            if(!item || !item.data || !item.date) {
                console.warn("Invalid booking item:", item);
                return null;
            }
            const { hospitalName, county, city, rating, hospitalType } = item.data;
            if(!hospitalName) {
                console.warn("Missing hospital name in booking:", item);
                return null;
            }
            return (
                <ResultCard 
                    key={index}
                    hospitalName={hospitalName}
                    county={county || "Unknown"}
                    city={city || "Unknown"}
                    rating={rating || "N/A"}
                    hospitalType={hospitalType || "General"}
                    atBookingsPage={true}
                    bookedDate={item.dateTime.date}
                    bookedTime={item.dateTime.time}
                />
            )
        }).filter(Boolean);
    }

    //get bookings from local
    useEffect(() => {
        console.log("initial load...")
        const localBookings = localStorage.getItem("bookings");
        if(localBookings){
            setBookings(JSON.parse(localBookings));
        }
    }, []);
    
    return (
        <div className='SearchResults' >
            <div className='commonContainer resultsBody'>
                <div className='resultsHead'>
                    <h1>My Bookings</h1>
                    <p>
                        {/* <img src={checkIcon} alt='check icon' className='checkIcon'/>
                        <span>{subText}</span> */}
                    </p>
                </div>
                <div className='cardAndSensodyne'>
                    <aside className='resultCardsArray'>
                        {displayCards()}
                    </aside>
                    <aside className='sensodyne'></aside>
                </div>
            </div>
        </div>
    );
};

export default Bookings;