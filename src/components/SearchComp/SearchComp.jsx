import React from 'react';
//styles
import "./SearchComp.css";
// assets
import doctorImage from "../../assets/doctor.svg";
import laboratoryImage from "../../assets/laboratory.svg";
import hospitalImage from "../../assets/hospital.svg";
import medicalStore from "../../assets/medical.svg";
import ambulance from "../../assets/ambulance.svg";
//components
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import { Link, useNavigate } from 'react-router-dom';

const SearchComp = () => {
    const navigate = useNavigate();
    
    //variables
    const cardsImages = [
        {image: doctorImage, text:"doctors"},
        {image: laboratoryImage, text:"labs"},
        {image: hospitalImage, text:"hospitals", customStyle: "cardSelected"},
        {image: medicalStore, text:"medical store"},
        {image: ambulance, text:"ambulance"},
        
    ]
    //functions
    const displayCards = () => cardsImages.map(item => <Card customStyle={item.customStyle} image={item.image} text={item.text} /> );

    const handleSearchSubmit = () => {
        navigate("/find");
    };

    return (
        <div className='SearchComp'>
            <div className='commonContainer SearchCompBody'>
                <SearchBar atHomePage={true} onSearchSubmit={handleSearchSubmit}/>
                <div className='cardsDivWrapper'>
                    <p>You may be looking for</p>
                    <div className='cardsDiv'>
                        {displayCards()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchComp;