import './App.css';
import Topitems from './Components/Topitems';
import Footer from '../src/Components/Footer';
import Maps from './Components/Maps';
import List from './Components/List';
import { getPlacesData } from './API';
import React, {useEffect, useState} from 'react'; 

function App() {

  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  // type
  const [type, setType] = useState('restaurants');
  // rating 
  const [rating, setRating] = useState(''); 
  // cuisine 
  const [cuisine, setCuisine] = useState('');

  const [childClicked, setChildClicked] = useState(null);

  
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);



  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords : {latitude, longitude}}) =>{
            setCoordinates({lat: latitude, lng: longitude});
      }) 
  },[])


  // rating
  useEffect(() => {
    const filteredRestaurants = places.filter((place) => place.rating >= rating);
    setFilteredRestaurants(filteredRestaurants);
  }, [rating]);



  useEffect(()=>{
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data)=> {
         setPlaces(data);
         setFilteredRestaurants([]);
         setIsLoading(false);
      })
  },[type, coordinates, bounds]);

  return (
    <>
      <Topitems 
              places = {filteredRestaurants.length ? filteredRestaurants : places}
              rating={rating}
              setRating={setRating}
              cuisine={cuisine}
              setCuisine={setCuisine}
              type={type}
              setType={setType}
              setCoordinates={setCoordinates}
              />
      <div className="body">
        <div className="listContainer">
          <List places = {filteredRestaurants.length ? filteredRestaurants : places}
                childClicked={childClicked}
                isLoading={isLoading}
          />
        </div>
        <Maps 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places = {filteredRestaurants.length ? filteredRestaurants : places}
            setChildClicked={setChildClicked}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;

