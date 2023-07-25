import React from 'react';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { FormControl, Button, Menu, MenuItem, Select, makeStyles, InputBase } from '@material-ui/core';
import useStyles from '../Styles/liststyle';
import { BorderBottom } from '@material-ui/icons';
// import makeStyles from '../Styles/searchBarStyle';

const libraries = ['places', 'geometry', 'geocoding'];

function Topitems({ places, rating, setRating, cuisine, setCuisine, cuisinesData, type, setType }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    toggleDropdownList();
  };

  const toggleDropdownList = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdownList = (event) => {
    if (!event.target.matches('.dropdown-button')) {
      setIsDropdownOpen(false);
    }
  };

  
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Attach the event listener to the window to close the dropdown when clicked outside
  window.addEventListener('click', closeDropdownList);


  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(true);
  };

  const handleEnterDatesClick = () => {
    setShowDatePicker(true);
  };

  
  
  // calendar
  const CustomInput = ({ value, onClick }) => (
    <div className="custom-input" onClick={onClick}>
      <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
      <span className="input-text">{value || 'Enter dates'}</span>
    </div>
  );


  // List style
    const classes = useStyles();


    // filter and attractions 
  const [attractionsAnchorEl, setAttractionsAnchorEl] = useState(null);

    const handleAttractionsTypeChange = (value) => {
            setType(value);
            handleAttractionsClose();
    }
  const handleAttractionsButtonClick = (event) => {
    setAttractionsAnchorEl(event.currentTarget);
  };

  const handleAttractionsClose = () => {
    setAttractionsAnchorEl(null);
  };

  const handleAttractionsClick = () => {
    // Handle attractions click
    // ...
    setAttractionsAnchorEl(null);
  };


  // search bar
  // Declare the autocomplete variable using useState hook
  const [autocomplete, setAutocomplete] = useState(null);

  // Attach the event listener to the window to close the dropdown when clicked outside
  useEffect(() => {
    const closeDropdownList = (event) => {
      if (!event.target.matches('.dropdown-button')) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('click', closeDropdownList);

    return () => {
      window.removeEventListener('click', closeDropdownList);
    };
  }, []);

  // Rest of the code...

  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace();
    // You can do something with the selected place object here.
  };
         
  
  /* ------------ FILTER BUTTON --------------------- */
  
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const handleFilterButtonClick = (event) => {
      setFilterAnchorEl(event.currentTarget);
    };
    const handleFilterClose = () => {
       setFilterAnchorEl(null);
    };

    /* ------------- HANDLE FILTER CHANGES------------*/
    const handleTypeChange = (type) => {
      if (type === 'rating') {
        setRatingFilterAnchorEl(filterAnchorEl);
      }else if(type === 'cuisine') {
        setCuisineFilterAnchorEl(filterAnchorEl);
      }

      handleFilterClose();
     };

  
    
  /* ------------ RATING BUTTON --------------------- */

    const [ratingFilterAnchorEl, setRatingFilterAnchorEl] = useState(null);
    const handleRatingFilterOpen = (event) => {
      setRatingFilterAnchorEl(event.currentTarget);
    };
    const handleRatingFilterClose = () => {
      setRatingFilterAnchorEl(null);
    };
    const handleRatingValue = (value) => {
      // Filter the restaurants based on the selected rating value
      const filteredRestaurants = places.filter((place) => Number(place.rating) >= value);
      // Update the state with the filtered restaurants
      setRating(value);
      setFilteredRestaurants(filteredRestaurants);
      setRatingFilterAnchorEl(null); // Close the rating filter menu
      console.log(value)
    };

  /* ------------ Cuisine BUTTON --------------------- */

    // cuisine
    useEffect(() => {
      if (cuisine === '') {
        // If no cuisine is selected, show all restaurants
        setFilteredRestaurants(places);
      } else {
        // Filter the restaurants based on the selected cuisine value
        const filteredRestaurants = places.filter((place) => String(place.cuisine) === cuisine);
        setFilteredRestaurants(filteredRestaurants);
      }
    }, [cuisine, places]);

    
    const [cuisineFilterAnchorEl, setCuisineFilterAnchorEl] = useState(null);
    const handleCuisineFilterOpen = (event) => {
      setCuisineFilterAnchorEl(event.currentTarget);
    };
    const handleCuisineFilterClose = () => {
      setCuisineFilterAnchorEl(null);
    };
  
    const handleCuisineValue = (value) => {
      // Filter the restaurants based on the selected cuisine value
      const filteredRestaurants = places.filter((place) => String(place.cuisine) === value);
      // Update the state with the filtered restaurants
      setCuisine(value);
      setFilteredRestaurants(filteredRestaurants);
      setCuisineFilterAnchorEl(null); // Close the cuisine filter menu
    };



    return (
        <>  
            <div className='container-x1'>
            <div className='date-btn'>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} customInput={<CustomInput />} />
            </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
                  <Autocomplete onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={handlePlaceSelect}>
                    <input type="text" className="form-control" placeholder="Where to?" />
                  </Autocomplete>
              </div>
              <Button  className={classes.filterButton} onClick={handleFilterButtonClick} aria-haspopup="true">Filters</Button>
              <Menu
                id="filter-menu"
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={() => handleTypeChange('rating')}>Rating<i className="fas fa-chevron-right dropdown-icon" style={{ fontSize: '10px', paddingLeft: '28px', paddingTop:'4px'}}></i></MenuItem>
                <MenuItem onClick={() => handleTypeChange('cuisine')}>Cuisine <i className="fas fa-chevron-right dropdown-icon" style={{ fontSize: '10px', paddingLeft: '12px', paddingTop: '4px' }}></i></MenuItem>
              </Menu>

              {/*---------------- Filter Button > Rating select ----------- */}
                  <Menu
                    id="rating-filter-menu"
                    anchorEl={ratingFilterAnchorEl}
                    open={Boolean(ratingFilterAnchorEl)}
                    onClose={handleRatingFilterClose}
                  >
                      <MenuItem onClick={() => handleRatingValue(0)}>All</MenuItem>
                      <MenuItem onClick={() => handleRatingValue(3)}>Rating above 3.0</MenuItem>
                      <MenuItem onClick={() => handleRatingValue(4)}>Rating above 4.0</MenuItem>
                      <MenuItem onClick={() => handleRatingValue(4.5)}>Rating above 4.5</MenuItem>
                  </Menu>

              {/*---------------- Filter Button > Cuisine select ----------- */}                

                  <Menu
                    id="cuisine-filter-menu"
                    anchorEl={cuisineFilterAnchorEl}
                    open={Boolean(cuisineFilterAnchorEl)}
                    onClose={handleCuisineFilterClose}
                  >
                    <MenuItem onClick={() => handleCuisineValue('Italian')}>Italian</MenuItem>
                    <MenuItem onClick={() => handleCuisineValue('Indian')}>Indian</MenuItem>
                    <MenuItem onClick={() => handleCuisineValue('Chinese')}>Chinese</MenuItem>
                    <MenuItem onClick={() => handleCuisineValue('Vegetarian Friendly')}>Vegetarian Friendly</MenuItem>
                    <MenuItem onClick={() => handleCuisineValue('Halal')}>Halal</MenuItem>
                    <MenuItem onClick={() => handleCuisineValue('Asian')}>Asian</MenuItem>
                  </Menu>

              {/*---------------- Attractions button ----------- */}
              <Button
                className={classes.AttractionsButton}
                onClick={handleAttractionsButtonClick}
                aria-haspopup="true"
              >
                Attractions <i className="fas fa-chevron-down dropdown-icon" style={{ paddingLeft: '4px' }}></i>
              </Button>
              <Menu
                id="attractions-menu"
                anchorEl={attractionsAnchorEl}
                open={Boolean(attractionsAnchorEl)}
                onClose={handleAttractionsClose}
              >
                {/* Add menu items for Attractions dropdown */}
                <MenuItem onClick={() => handleAttractionsTypeChange('restaurants')}>Restaurants</MenuItem>
                <MenuItem onClick={() => handleAttractionsTypeChange('hotels')}>Hotels</MenuItem>
                <MenuItem onClick={() => handleAttractionsTypeChange('attractions')}>Tourist Places</MenuItem>
                {/* Additional menu items for Attractions */}
                {/* ... */}
              </Menu>

            </div>
        </>
    )
}

export default Topitems;

