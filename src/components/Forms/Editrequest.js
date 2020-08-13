import React,{useCallback,useState , useEffect} from 'react';
//import {Link} from 'react-router-dom';
import { reduxForm} from 'redux-form';
//import {Label} from 'reactstrap';
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

//import Editrequest from '../EditRequest';
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
    marginTop: theme.spacing(1),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
  },
}));

const EditRequest = ({history}) =>{
  const [state,setstate] = useState({
    date:"",
    hall:"",
    people:0,
    rooms:0,
    food:"",
    snacks:"",
    budget:0,
})
  const classes = useStyles();
  useEffect(
    () =>{
      const axios = require("axios")
      axios.get('http://localhost:5000/getrequestid')
  .then(res => {
      axios.get(`http://localhost:5000/requests/${encodeURIComponent(res.data.requestId)}`)
      .then(function(response)
      {
        //console.log(response);
        var temp = {...state}
        temp.date = response.data.date
        temp.hall = response.data.hall
        temp.people = response.data.people
        temp.rooms = response.data.rooms
        temp.budget = response.data.budget
        temp.food = response.data.food
        temp.snacks = response.data.snacks
        setstate(temp)
      })
      .catch(function(response)
      {
        alert(response)
      })
  })
    },[]
  )
  
  
  const editrequest = useCallback(async event => {
    event.preventDefault();
    const {hall,rooms,snacks,date,people,food,budget} = event.target.elements;
  const axios=require("axios")
  axios.get('http://localhost:5000/getrequestid')
  .then(res => {
      //var requestid=res.data.requestId
      //console.log(this.res.data.localityId)
      axios.put(`http://localhost:5000/requests/${encodeURIComponent(res.data.requestId)}`,{
          hall:hall.value,
          rooms:rooms.value,
          snacks:snacks.value,
          date:date.value,
          people:people.value,
          food:food.value,
          budget:budget.value,
      })
      .then(function(response)
      {
        console.log(response)
      })
  })
  .catch(err => {
    console.log(err)
  })
      history.push("/userhome");
  }, [history]);
    return(
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form method="PUT" onSubmit={editrequest}>
        <p>Hall Type</p>
        <TextField variant="outlined"
            required
            fullWidth
            id="select"
            label={state.hall}
            placeholder='hall type'
            multiline
            name="hall"
            autoComplete="Hotel Type" 
            select>
            <MenuItem value="banquethall">Banquet Hall</MenuItem>
            <MenuItem value="conferencehall">Conference Hall</MenuItem>
            <MenuItem value="seminarhall">Seminar Hall</MenuItem>
            <MenuItem value="businnesshall">Buisness Hall</MenuItem>
        </TextField>
        <TextField
              autoComplete="Date"
              name="date"
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="date"
              label="Date"
              placeholder={state.date}
              autoFocus
            />
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <p>Food</p>
          <TextField variant="outlined"
            required
            fullWidth
            id="select"
            label={state.food}
            name="food"
            autoComplete="Food" 
            select>
            <MenuItem value="NonVeg">Non Veg</MenuItem>
            <MenuItem value="Veg">Veg</MenuItem>
          </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
          <p>Snacks</p>
          <TextField variant="outlined"
            required
            fullWidth
            id="select"
            label={state.snacks}
            name="snacks"
            autoComplete="Hotel Type" 
            select>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          </Grid>
        </Grid>
          <TextField
            autoComplete="People"
            name="people"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="people"
            label="Number Of people"
            placeholder={state.people}
            autoFocus
          />
          <TextField
            autoComplete="Rooms"
            name="rooms"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="rooms"
            label="For How Many People you want to book rooms"
            placeholder={state.rooms}
            multiline
            autoFocus
          />
          <TextField
            autoComplete="Budget"
            name="budget"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="budget"
            label="Preferred Budget"
            placeholder={state.budget}
            multiline
            autoFocus
          />
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          >
          Submit Request
        </Button>
        </form>
        </div>
        <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
    )
}
export default withRouter(reduxForm({
    form:'simple'
})(EditRequest))