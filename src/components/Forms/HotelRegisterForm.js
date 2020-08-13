import React,{useCallback,useState} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import app from "../config/hotelfirebase";
import {withRouter} from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ABC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const HotelRegisterForm = ({history}) => {
  //const [locationId,setlocationId]=useState(0)
  const classes = useStyles();
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, cnfpassword ,name , phone , category, type, locality, city, state} = event.target.elements;
  const axios=require("axios")
  axios.post('http://localhost:5000/getlocalityId',null,{params:{
    locality: locality.value,
    city: city.value,
    state: state.value
  }})
  .then(res => {
      console.log(res.data.localityId)
      const localityId=res.data.localityId
      //alert(cnfpassword.value)
      //console.log(this.res.data.localityId)
      console.log(cnfpassword.value)
      console.log(name.value)
      axios.post("http://localhost:5000/hotels",{
        
        name:name.value,
        email:email.value,
        phone:phone.value,
        category:category.value,
        type:type.value,
        locationId:localityId,
      })
      .then(function(response)
      {
        console.log(response)
      })
  })
  .catch(err => {
    console.log(err)
  })
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, cnfpassword.value);
        app.auth().signOut();
      history.push("/Hotellogin");
    // catch (error) {
    //   alert(error);
    // }
    // finally
    // { 
    //   return false
    // }
  }, [history]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form method="POST" onSubmit={handleSignUp}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="hotelname"
                label="Hotel Name"
                name="name"
                autoComplete="Hotel Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField variant="outlined"
            required
            fullWidth
            margin="normal"
            id="select"
            label="Category"
            name="category"
            autoComplete="Category" 
            select>
            <MenuItem value="5 star">5 star</MenuItem>
            <MenuItem value="4 star">4 star</MenuItem>
            <MenuItem value="3 star">3 star</MenuItem>
            <MenuItem value="2 star">2 star</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField variant="outlined"
            required
            fullWidth
            margin="normal"
            id="select"
            label="Hotel Type"
            name="type"
            autoComplete="Hotel Type" 
            select>
            <MenuItem value="business">Business Hotel</MenuItem>
            <MenuItem value="resort">Resort Hotel</MenuItem>
        </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
            autoComplete="state"
            name="state"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="state"
            label="State"
            autoFocus
          />
          <TextField
            autoComplete="city"
            name="city"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            autoFocus
          />  
          <TextField
            autoComplete="locality"
            name="locality"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="locality"
            label="Preferred locality"
            autoFocus
          />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="Phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cnfpassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
          Sign Up
          </Button>
          <Grid container justify="flex-end">
          </Grid>
              <Grid item>
                <Link to={`/hotellogin`} variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
              <Grid item>
                <Link to={`/`} variant="body2">
                  {"Click here for Home page"}
                </Link>
              </Grid>
            
          </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    
  )
}

export default withRouter(reduxForm({
  form: 'simple' // a unique identifier for this form
})(HotelRegisterForm))