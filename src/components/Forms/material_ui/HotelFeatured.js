import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Button } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {useHistory } from "react-router-dom";
const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  const history = useHistory();
  const hotelhome = () =>{
    let path=`/hotelhome`;
    history.push(path)
  }
  return (
    <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Button variant="contained" color="primary" onClick={hotelhome}>Click Here</Button>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden>
        </Card>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};

export default withRouter(FeaturedPost)