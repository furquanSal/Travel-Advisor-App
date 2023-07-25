import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
    // marginBottom: '10px',
    // borderRadius: '20px',
    // '& .MuiSelect-select': {
    //   borderRadius: '20px',
    //   border: '1px solid #ccc',
    // },
  },
  filterButton: {
    borderRadius: '20px',
    border: '1px solid rgb(187, 186, 186)',
    color: '#333',
    textTransform:'capitalize',
    marginRight:'3px',
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingRight: '12px',
    paddingLeft: '12px',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '12px',
    '&:after': {
      display: 'none',
    },
  },
  AttractionsButton: {
    borderRadius: '20px',
    border: '2px solid #000000',
    color: '#000',
    fontWeight:'600',
    cursor: 'pointer',
    textTransform:'capitalize',
    marginLeft:'3px',
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingRight: '12px',
    paddingLeft: '12px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '12px',
    '&:after': {
      display: 'none',
    },
  },
  select: {
      fontSize:'14px',
      paddingTop: '1px',
      paddingBottom: '1px',
      paddingRight: '2px',
      paddingLeft: '8px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2), 
  },
  loading: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: '25px', 
  },
  marginBottom: {
    marginBottom: '30px', 
  },
  list: {
    height: '80vh',
    overflow: 'auto',
  },
}));