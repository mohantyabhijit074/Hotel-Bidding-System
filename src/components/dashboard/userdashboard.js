import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
//import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import { Table } from 'react-bootstrap'
import axios from 'axios';
import app from '../config/firebase';
import {Link} from 'react-router-dom';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
class ClippedDrawer extends Component {
  state = {
    posts:[]
  }
  componentDidMount(){
    axios.get('http://localhost:5000/getrequestbyid')
    .then(res => {
      console.log(res.data.request[0])
      this.setState({
        posts:res.data.request
      })
    })
  }
  render(){
    const showrequest=()=>{
      var postlist=[]
      var i=0
      for(i=0;i<this.state.posts.length;i++)
      {
        postlist.push(
          <React.Fragment>
            <tr key={this.state.posts[i].id}>
            <td><Link to={{pathname:'/userbiddashboard',state:{id:this.state.posts[i].id}}}>{this.state.posts[i].id}</Link></td>            
            <td>{this.state.posts[i].hall}</td>           
            <td>{this.state.posts[i].people}</td>            
            <td>{this.state.posts[i].rooms}</td>
            <td>{this.state.posts[i].date}</td>            
            </tr>
          </React.Fragment>         
        )
      }
      return postlist
      //console.log(this.state.posts[0])
    }
    const classes = this.props.classes;
    const history = this.props.history;
    const Home = () =>{ 
      let path = `/`; 
      history.push(path);
    }
    const EditRequest = () =>{ 
      let path = `/editrequest`; 
      history.push(path);
    }
    const logout = () =>{ 
      app.auth().signOut()
      let path = `/logout`; 
      history.push(path);
      
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              DashBoard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {
                <ListItem button>
                  <ListItemIcon><button onClick={Home}><HomeIcon color="primary"/></button>Home</ListItemIcon>                 
                  <ListItemText/>
                </ListItem>
                
              }
            </List>
            <List>
              {
                <ListItem button>
                  <ListItemIcon><button onClick={logout}><ExitToAppIcon/></button>Log Out</ListItemIcon>                
                  <ListItemText/>
                </ListItem>
                
              }
            </List>
            <Divider/>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Typography paragraph>
          <Table striped bordered hover>
          <thead>
          <h1>REQUESTS DETAILS</h1>
              <tr>
                  <th>id</th>
                  <th>Hall Type</th>
                  <th>Number of People</th>
                  <th>Number of Rooms</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody>
              { showrequest() } 
          </tbody>
      </Table>
          </Typography>
        </main>
      </div>
    );}
  
}

export default ()=>{
  const classes = useStyles();
  const history = useHistory();
  return (
    <ClippedDrawer classes={classes} history={history} />
    )
}