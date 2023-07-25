import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../Styles/placedetailstyle';

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  if(selected) refProp?.current?.scrollIntoView({behavior:"smooth", block: "start"})

  const handleOnWebDetailsClick = () => {
    window.open(place.web_url, '_blank');
  };

  const handleOnWebsiteClick = () => {
    window.open(place.website, '_blank');
  };

  return (
    <Card elevation={6}>
      <Box display="flex">
        <CardMedia
          className={classes.cardMedia} // Apply the cardMedia class to the CardMedia component
          component="img" // Use img component to apply fixed width and height
          image={place.photo ? place.photo.images.large.url : 'https://www.iceagetrail.org/wp-content/uploads/2016/11/currently-unavailable.png'}
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">{place.name}</Typography>
          <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
            <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant='subtitle1'>Price</Typography>
            <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant='subtitle1'>Ranking</Typography>
            <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
          </Box>
          {place?.cuisine?.map(({ name }) => (
            <Chip key={name} size="small" label={name} className={classes.chip} />
          ))}
          {place?.address && (
            <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
              <LocationOnIcon /> {place.address}
            </Typography>
          )}
          {place?.phone && (
            <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
              <PhoneIcon /> {place.phone}
            </Typography>
          )}
                <CardActions>
        <Button size='small' color='primary' onClick={handleOnWebDetailsClick}>
          Trip Advisor
        </Button>
        <Button size='small' color='primary' onClick={handleOnWebsiteClick}>
          Visit Website
        </Button>
      </CardActions>
      </CardContent>
      </Box>
    </Card>
  );
}

export default PlaceDetails;
