import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import useStyles from '../Styles/mapStyles';
import { useMediaQuery, Paper } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import { Typography } from 'antd';

const Maps = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {

    const handleMapChange = (e) => {
            setCoordinates({lat:e.center.lat, lng: e.center.lng});
            setBounds({ne:e.marginBounds.ne, sw: e.marginBounds.sw})
        }

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div style={{ width: '45%', float: 'right', marginTop:'0px'}}>
            <div className={classes.mapContainer}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyB1aHlTZFtm71s35Siib3PVrJwyGV-lpBE' }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={14}
                    margin={[50, 50, 50, 50]}
                    options={''}
                    onChange={handleMapChange}
                    onChildClick={(child) => setChildClicked(child)}
                >
                    {places?.map((place, i) => (
                            <div  className={classes.markerContainer}
                                  lat={Number(place.latitude)}
                                  lng={Number(place.longitude)}
                                  key={i}
                            >
                                    {
                                        !isDesktop ? (
                                            <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                                        ) : (
                                            <Paper elevation={3} className={classes.paper}>
                                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                                            {place.name}
                                                    </Typography>
                                                    <img
                                                        className={classes.pointer}
                                                        src={place.photo ? place.photo.images.large.url : 'https://www.iceagetrail.org/wp-content/uploads/2016/11/currently-unavailable.png'}
                                                        alt={place.name}                                                    
                                                    />
                                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                            </Paper>
                                        )
                                    }
                            </div>
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default Maps;
