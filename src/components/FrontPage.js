import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
//import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Forms/material_ui/frontpageheader';
import MainFeatures from './Forms/material_ui/Mainhelper';
import FeaturedPost from './Forms/material_ui/Featured';
import HotelFeaturedPost from './Forms/material_ui/HotelFeatured';
import Main from './Forms/material_ui/Frontpagemain';
import Sidebar from './Forms/material_ui/Sidebar';
import Footer from './Forms/material_ui/HotelFooter';
import UserBackground from '../images/hotel1.jpg';
import HotelBackground from '../images/hotel2.jpg';
import Hall from '../images/hall.jpg';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'About us', url: '#' },
  { title: 'Contact us', url: '#' },
];

const MainFeature = {
  title: 'Hotel Bidding System',
  description:
    "You are looking for a seminar hall or you are a owner of a hotel this is a best place to look in. We hope you will be pleased to use our services",
  image:Hall,
  imgText: 'main image description',
};

const Featured = [
  {
    title: 'If You Are a user',
    description:
      'Enough of Bargaining, let everything hotels to handle. We at ABC are presenting website name. This is a user friendly website where the user has to make a request and just he has to wait till all the hotels end up in a bidding war and user will get in a lowest price possible.',
    image: UserBackground,
    imageText: 'User Background',
  },
];
const HotelFeatured = [
  {
    title: 'If You are Hotel',
    description:
      'You Want To Enjoy A Bidding War then you have come to write place, bid your price for a particular customer and compete with different hotels to increase your reputation.This Website will help you in getting connected with your beloved users.',
    image:HotelBackground,
    imageText: 'Hotel Image',
  },
];

const sidebar = {
  title: 'About',
  description:
    'This is Website where hotel Bids to a particular user',
  social: [
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

function FrontPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="WEBSITE NAME" sections={sections} />
        <main>
          <MainFeatures post={MainFeature} />
          <Grid container spacing={4}>
            {Featured.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
            {HotelFeatured.map((post) => (
              <HotelFeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Details about our website" />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}
export default FrontPage;