import React,{useContext,useCallback} from 'react'
import {reduxForm } from 'redux-form'
import {Link} from 'react-router-dom';
import { withRouter, Redirect } from "react-router";
import app from "../config/firebase";
import { AuthContext } from "../auth";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm =({ history },reset) => {
  const classes = useStyles();
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        //console.log(username.value)
        const axios=require("axios")
        axios.post("http://localhost:5000/login",{
        //username:username.value,
        useremail:email.value,
        password:password.value
      })
      .then(function(response)
      {
        console.log(response)
      })
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/userhome");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/userhome" />;
  }

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
          Sign in
      </Typography>
      <form action="http://localhost:5000/login" method="POST" onSubmit={handleLogin}>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              </Grid>
              <Grid item>
                <Link to={`/register`} variant="body2">
                  {"Don't have an account? Sign Up"}
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
})(LoginForm))