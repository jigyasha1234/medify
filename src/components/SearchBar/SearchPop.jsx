import React from 'react';
//components
import ResultCard from '../ResultCard/ResultCard';
import Button from '../Button/Button';

const SearchPop = props => {
    //props
    const { locations, clickFunction, hospitals, atBookingsPage } = props;
    //functions
    const displayStates = () => {
        if(atBookingsPage){
            if(!hospitals || !hospitals?.length) return null;

            return hospitals.map((item, index) => {
                const { hospitalName, county, city, rating, hospitalType } = item.data;
                const { time, date } = item.dateTime;
                return (
                    <li key={index} onClick={() => clickFunction(hospitalName)} className='SearchPopItem SearchPopItem-bookings'>
                        <span>{hospitalName}</span>
                        <span className='resultContent-right resultContent-top'>
                            <Button text={time} buttonClass={`smallButton blueButton-outlined`}/>
                            <Button text={date} buttonClass={`smallButton greenButton-outlined`}/>
                        </span>
                    </li>
                );
            });
        }

        if(!locations || !locations?.length) return null;

        return locations.map((item, index) => <li key={index} onClick={() =>  clickFunction(item)} className='SearchPopItem'>{item}</li>)
    }
    return (
        <ul className='SearchPop'>
            {displayStates()}    
        </ul>
    );
};

export default SearchPop;