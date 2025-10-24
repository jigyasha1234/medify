import React, { useContext, useEffect, useRef, useState } from 'react';
import axios, { all } from 'axios';
//styles
import "./SearchBar.css"
//assetes
import searchIcon from "../../assets/search.svg"
import location from "../../assets/location.svg"
import loadingIcon from "../../assets/loading.svg";
//components
import Button from '../Button/Button';
import { findLocations, findBookings } from '../../functions/functions';
import SearchPop from './SearchPop';
//components
import { BookingsContext, FoundHospitalsContext } from '../../contexts/AllContexts';

//apis
const api = "https://meddata-backend.onrender.com";
const SearchBar = props => {
    //const
    const { customClass, atBookingsPage, atHomePage, onSearchSubmit } = props;
    //contexts
    const [bookings, setBookings] = useContext(BookingsContext)
    const [foundHospitals, setFoundHospitals] = useContext(FoundHospitalsContext)
    //states
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [allStates, setAllStates] = useState([]);
    const [filteredStates, setFilteredStates] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [disableCityInput, setDisableCityInput] = useState(undefined);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [fetchingHospitals, setFetchingHospitals] = useState(false)
    //refs
    const stateName_onChange = useRef(false);
    const cityName_onChange = useRef(false);
    const fetchingCities = useRef(false);
    //side effects
    useEffect(() => {
        // Fetch states on component mount
        getLocationData("states");
        
        // Add click outside handler to close dropdowns
        const handleClickOutside = (event) => {
            if (!event.target.closest('.inputWrapper')) {
                setFilteredStates([]);
                setFilteredCities([]);
                setFilteredHospitals([]);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    useEffect(()=> {
        if(stateName_onChange.current) filterStatesFunc();
    }, [stateName])

    useEffect(()=> {
        if(cityName_onChange.current) filterCitiesFunc();
    }, [cityName])

    useEffect(() => {
        filterBookingsFunc();
    }, [hospitalName])

    //functions
    const handleSubmit = async event => {
        event.preventDefault();
        
        if(atBookingsPage) return filterBookingsFunc();

        getLocationData("hospitals");
        
        // Navigate to find page if onSearchSubmit is provided (for homepage)
        if(onSearchSubmit) {
            onSearchSubmit();
        }
    }

    const getLocationData = async (dataType, location) => {
        if(dataType == "states"){
            try {
                const states = await axios.get(`${api}/states`);
                setAllStates(states.data);
            } catch (error) {
                console.error("Error fetching states:", error);
                // Fallback to hardcoded states if API fails
                const fallbackStates = [
                    "Alabama","Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
                    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
                    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
                    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
                    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
                    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
                    "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
                ];
                setAllStates(fallbackStates);
            }
        }
        if(dataType == "cities"){
            fetchingCities.current = true;
            const cities = await axios.get(`${api}/cities/${location}`);
            setAllCities(cities.data);
            fetchingCities.current = false;
            setDisableCityInput(undefined);
        }
        if(dataType === "hospitals"){
            setFetchingHospitals(true);
            const hospitals = await axios.get(`${api}/data?state=${stateName}&city=${cityName}`);
            setFoundHospitals({hospitals: hospitals.data, cityName, stateName});
            setFetchingHospitals(false);
        }
    }
    const handleChange = event => {
        const {value, name} = event.target;
        
        if(name === "state"){
            stateName_onChange.current = true;
            setStateName(value)
            setDisableCityInput("disableCityInput");
            cityName_onChange.current = false;
            setCityName("")
        }

        if(name === "city"){
            cityName_onChange.current = true;
            setCityName(value)
        }

        if(name === "hospitalName"){
            setHospitalName(value);
        }
    }

    const handleFocus = event => {
        const {name} = event.target;
        
        if(name === "state" && allStates.length > 0) {
            // Show all states when input is focused
            if(stateName === "") {
                setFilteredStates(allStates);
            } else {
                // Show filtered states if there's already text
                filterStatesFunc();
            }
        }

        if(name === "city" && allCities.length > 0) {
            // Show all cities when input is focused
            if(cityName === "") {
                setFilteredCities(allCities);
            } else {
                // Show filtered cities if there's already text
                filterCitiesFunc();
            }
        }

        if(name === "hospitalName" && bookings.length > 0) {
            // Show all hospitals when input is focused
            if(hospitalName === "") {
                setFilteredHospitals(bookings);
            } else {
                // Show filtered hospitals if there's already text
                filterBookingsFunc();
            }
        }
    }
    const filterStatesFunc = () => {
        
        let foundStates = findLocations(allStates, stateName);
        setFilteredStates(foundStates);
    }

    const filterCitiesFunc = () => {
        
        let foundCities = findLocations(allCities, cityName);
        setFilteredCities(foundCities);
    }

    const filterBookingsFunc = () => {
        
        let hospitals = findBookings(bookings, hospitalName);
        // console.log(hospitals);
        setFilteredHospitals(hospitals);
    }

    const clickStateSuggestions = (nameOfState) => {
        setFilteredStates([]);
        stateName_onChange.current = false;
        
        setStateName(nameOfState)

        getLocationData("cities", nameOfState);
    }
    const clickCitySuggetions = (nameOfCity) => {
        setFilteredCities([]);
        cityName_onChange.current = false;
        
        setCityName(nameOfCity)
    }

    const clickHospitalSuggestions = (hospitalName) => {
        setFilteredHospitals([]);
        setHospitalName(hospitalName);
    }

    const displayInputs = () => {
  if (atBookingsPage) {
    return (
      <div className='inputWrapper'>
        <img src={location} />
        <input
          type='text'
          value={hospitalName}
          name='hospitalName'
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder='Search By Hospital'
          id='hospitalName'
          required
        />
        <SearchPop
          atBookingsPage={true}
          hospitals={filteredHospitals}
          clickFunction={clickHospitalSuggestions}
        />
      </div>
    );
  }

  return (
    <>
      {/* STATE FIELD */}
      <div id="state" className="inputWrapper">
        <img src={location} />
        <input
          type="text"
          value={stateName}
          name="state"
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="state"
          required
        />
        {filteredStates?.length > 0 && (
          <div className="dropdown">
            {filteredStates.map((item, index) => (
              <li key={index} onClick={() => clickStateSuggestions(item)}>
                {item}
              </li>
            ))}
          </div>
        )}
      </div>

      {/* CITY FIELD */}
      <div id="city" className={`inputWrapper ${disableCityInput}`}>
        <img
          src={fetchingCities.current ? loadingIcon : location}
          className={fetchingCities.current ? "rotateLoad" : null}
        />
        <input
          type="text"
          value={cityName}
          name="city"
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={fetchingCities.current ? "Fetching cities..." : "city"}
          required
          disabled={disableCityInput ? true : false}
        />
        {filteredCities?.length > 0 && (
          <div className="dropdown">
            {filteredCities.map((item, index) => (
              <li key={index} onClick={() => clickCitySuggetions(item)}>
                {item}
              </li>
            ))}
          </div>
        )}
      </div>
    </>
  );
};


    return (
        <form onSubmit={handleSubmit} className={`SearchBar ${customClass}`}>
            {displayInputs()}

            <Button 
            formSubmit="true" 
            text={fetchingHospitals ? "Fetching..." : "search" }
            icon={fetchingHospitals ? loadingIcon : searchIcon} 
            buttonClass={"longButton"}
            rotateIcon={fetchingHospitals ? true : false}
            id="searchBtn"
            />
        </form>
    );
};

export default SearchBar;