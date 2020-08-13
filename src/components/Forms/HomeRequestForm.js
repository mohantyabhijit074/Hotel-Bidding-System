import React from 'react';
import '../../css/homerequest.css';
import 'react-dropdown/style.css';
import { reduxForm} from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './material_ui/Header';
import MainFeaturedPost from './material_ui/MainFeaturedPost';
import Footer from './material_ui/Footer';
const sections = [
  { title: 'About Us', url: '#' },
  { title: 'Contact Us', url: '#' },
];
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));
const mainFeaturedPost = {
  title: 'A new Way to Book Hotels ',
  description:"Enough of Bargaining, let everything hotels to handle. We at ABC are presenting website name. This is a user friendly website where the user has to make a request and just he has to wait till all the hotels end up in a bidding war and user will get in a lowest price possible.",
  //image:'https://source.unsplash.com/random,
};
const InitialRequest = props => {
      const classes = useStyles();
      
    return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="WEBSITE NAME" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={5} className={classes.mainGrid}>
          </Grid>
        </main>
      </Container>
      <Footer title="make a request" description="Click on the above button to make a request on the hotels of your choice" />
    </React.Fragment>
      
    )
  }

  export default reduxForm({
    form: 'simple' // a unique identifier for this form
  })(InitialRequest)
