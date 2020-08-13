import React from 'react';
import { reduxForm } from 'redux-form'
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        TaskMonk
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

const RequestForm = props => {
    const classes = useStyles();
    //const { reset } = props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form action="http://localhost:5000/requests" method="POST">
          <TextField variant="outlined"
              required
              fullWidth
              margin="normal"
              id="select"
              label="Hotel Type"
              name="hall"
              autoComplete="Hotel Type" 
              select>
              <MenuItem value="banquethall">Banquet Hall</MenuItem>
              <MenuItem value="conferencehall">Conference Hall</MenuItem>
              <MenuItem value="seminarhall">Seminar Hall</MenuItem>
              <MenuItem value="businnesshall">Buisness Hall</MenuItem>
          </TextField>
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
            <TextField
              autoComplete="Date"
              name="date"
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="date"
              label="Date(dd-mm-yyyy)"
              autoFocus
            />
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField variant="outlined"
              required
              fullWidth
              id="select"
              label="Food"
              name="food"
              autoComplete="Food" 
              select>
              <MenuItem value="NonVeg">Non Veg</MenuItem>
              <MenuItem value="Veg">Veg</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField variant="outlined"
              required
              fullWidth
              id="select"
              label="Snacks"
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
              label="Number of People"
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

  export default reduxForm({
    form: 'simple' // a unique identifier for this form
  })(RequestForm)