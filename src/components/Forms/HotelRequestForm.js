import React from 'react';
import '../../css/homerequest.css';
import 'react-dropdown/style.css';
import { reduxForm} from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './material_ui/hotelheader';
import MainFeature from './material_ui/hotelmainfeatured';
import Footer from './material_ui/HotelFooter';
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
const mainFeature = {
  title: 'A new Way to Bid Your Price For a particular Customer',
  description:"You Want To Enjoy A Bidding War then you have come to write place, bid your price for a particular customer and compete with different hotels to increase your reputation",
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
          <MainFeature post={mainFeature} />
          <Grid container spacing={5} className={classes.mainGrid}>
          </Grid>
        </main>
      </Container>
      <Footer title="We can add something here" description="Some description about the above footer" />
    </React.Fragment>
      
    )
  }

  export default reduxForm({
    form: 'simple' // a unique identifier for this form
  })(InitialRequest)
