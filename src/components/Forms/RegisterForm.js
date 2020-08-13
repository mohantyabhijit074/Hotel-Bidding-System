import React,{useCallback} from 'react'
import {reduxForm } from 'redux-form'
import {Link} from 'react-router-dom';
import app from "../config/firebase";
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
    marginTop: theme.spacing(8),
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
  },
}));

const RegisterForm = ({history}) => {
  const classes = useStyles();
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, cnfpassword , firstname, lastname} = event.target.elements;
    try {
        console.log(firstname.value)
        const axios=require("axios")
        axios.post("http://localhost:5000/users",{
        firstname:firstname.value,
        lastname:lastname.value,
        email:email.value,
        username:"",
        password:cnfpassword.value
      })
      .then(function(response)
      {
        console.log(response)
      })
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, cnfpassword.value);
		app.auth().signOut();
      history.push("/login");
    } 
    catch (error) {
      alert(error);
    }
    finally
    { 
      return false
    }
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
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
                <Link to={`/login`} variant="body2">
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
})(RegisterForm))