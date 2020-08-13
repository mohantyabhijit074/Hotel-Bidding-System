import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setLevel1, setLevel2, setLevel3, addHotels, fetchRequest, setRequestId, setconfirmed, cancelconfirmation } from './redux/buttonAction'

import { Link } from 'react-router-dom'
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import app from '../../../../components/config/firebase'
import axios from 'axios'
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
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
function ButtonContainer(props) {
    var status = ""
    const history = useHistory()

     const [dataset, setdataset] = useState({
         data: [],
         finaldata: []
     })

     const [userId, setuserId] = useState(0)
     const [requestid, setrequestid] = useState(0)    // tempid holds requestId which will later be got from userDashboard component
                                                //hence eliminating the need for a http response

    async function getRequestId() {
        var id = 0    // here temp holds the requestId
        const res = await fetch("http://localhost:5000/getrequestid")
        console.log(res)
        if (res.status === 404) {
            alert("user has not logged in!")
        }       
        else {
            res
            .json()
            .then(resp => {
                id = resp.requestId
            })
            .then( () => {
                console.log("requestid = + and state = " + id)
                props.setRequestId(id)
                fetchRequestsHotelData(id)  /// call all hotels with this requestId and show in table
            })
            .catch(err => {
                alert(err)
            })
        }
    }

    // fetch all hotels regardless of requestId
    async function fetchHotelData() {
        const res = await fetch("http://localhost:5000/hotels");
        res
          .json()
          .then(resp => {
            console.log("fetch hotel data")
            const st = {...dataset}
                for (var i in resp.hotels) {
                    st.data.push({
                        "category":resp.hotels[i].category,
                        "type": resp.hotels[i].type,
                        "id": resp.hotels[i].id,
                        "name": resp.hotels[i].name,
                        "price": 0
                    })
                }
                setdataset(st)
                console.log(dataset)
            })
          .catch(err => alert(err));
      }

    // this function receives all the the hotels for that particular requestID, param holds the requestId
    async function fetchRequestsHotelData(param) {
        var temp = {...dataset}
        const res =  await fetch('http://localhost:5000/sendrequeststohotels')
        res
        .json()
        .then(resp => {
           console.log("dataset.requestid = " + dataset.requestId)
            for (var i=0; i<resp.length; i++) {
               for (var j=0; j<temp.data.length; j++) {
                   if (temp.data[j].id == resp[i].hotelId && resp[i].requestId === param && resp[i].bidprice > 0) {
                       temp.finaldata.push({
                        "category":temp.data[j].category,
                        "type": temp.data[j].type,
                        "id": temp.data[j].id,
                        "name": temp.data[j].name,
                        "confirmed": temp.data[j].confirmed,
                        "price": resp[i].bidprice,
                        "requestId": resp[i].requestId
                       }
                    )}
               }
            }
            setdataset(temp)    // update final dataset 
            console.log(dataset.finaldata)  
            props.addHotels(dataset.finaldata)
        })
        .catch(err => alert(err));
    }

    useEffect(() => {  
        console.log("use effect") 
        fetchHotelData()
        getRequestId()         
 }, [])

    useEffect(() => {
        console.log('use effect 2')

        // get requestId
        axios.get('http://localhost:5000/getrequestid')
        .then(res => {
            console.log("READ THIS!")
            props.setRequestId(res.data.requestId)
            setrequestid(res.data.requestId)
        })
        .catch(err => {
            alert(err)
        })


        if (requestid != 0) {
            axios.get(`http://localhost:5000/requests/${encodeURIComponent(requestid)}`)
            .then(res => {
                    console.log("response = ")
                    console.log(res.data.confirmed)
                    props.fetchRequest(res.data)
                    
                    if (res.data.confirmed == 1) {
                        props.setConfirmed(res.data.confirmed_with_hotel)
                    }
            })
            .catch(err => {
                alert("error in requests" + err)
            })
        }

    }, [requestid])

    // function to display request
    const displayRequest = () => {
        return (
            <div>
                <b>CURRENT REQUEST</b>
                <br></br>
                id: {props.requestData.id}
                <br></br>
                hall: {props.requestData.hall}
                <br></br>
                date: {props.requestData.date}
                <br></br>
                people: {props.requestData.people}
                <br></br>
                rooms: {props.requestData.rooms}
                <br></br>
                <Button onClick={() => {
                    if (props.confirmed === 1)
                        alert("booking already confirmed!")
                    else 
                        history.push('/editrequest')
                }}>edit request</Button>
            </div>
            
        )
    }

    // function to help display the filter buttons
    const buttonsHelper = () => {
        console.log('inside button helper')
        if (props.level === 1) {
            status = ""           
            
            return (
                <div>
                    <Button variant="dark" onClick={() => {status = "five_star"; props.setLevel2(status)}}>5 star</Button>
                    <Button variant="dark" onClick={() => {status  = "four_star"; props.setLevel2(status)}}>4 star</Button>
                    <Button variant="danger" onClick={() => {status = "overall"; props.setLevel3(status)}}>find overall lowest bid</Button>
                </div>
            )
        }
        if (props.level === 2) {
            return (
                <div>
                    <Button onClick={() => {status = props.status+"_business"; props.setLevel3(status)}}>business</Button>
                    <Button onClick={() => {status = props.status+"_resort"; props.setLevel3(status)}}>resort</Button>
                    <Button onClick={props.setLevel1}>back</Button>
                </div>
            )
        }
        if (props.level === 3) {
            return (
                <div>
                    <Button onClick={props.setLevel1}>back</Button>
                </div>
            )
        }
    }

    // function to display the json data in a table format
    const table_rows = () => {
        var arr=[]
        
        for (var i=0; i<props.data.length; i++) {
            // if booking is already confirmed then  only show that particular hotel
            if (props.confirmed == 1) {
                arr = []
                arr.push(
                    <tr>
                        <td>{props.data[i].id}</td>
                        <td>{props.data[i].category}</td>
                        <td>{props.data[i].type}</td>
                        <td>
                            <Link to={{
                            pathname: '/HotelDetails',
                            hotel_name: props.confirmed_with_hotel
                            }}> {props.confirmed_with_hotel} </Link>
                        </td>
                        <td>{props.data[i].price}</td>
                        <td><label>confirmed</label></td>
                        <td><Button value={[props.data[i].name, props.data[i].id]} onClick={(e) => {
                          //alert(requestid)
                          axios.delete(`http://localhost:5000/confirmbid`, {
                            data: {
                              requestid: requestid,
                              hotelname: "",
                              hotelid: e.target.value.split(",")[1],
                              confirmed: "0"
                            }
                          })
                          .then(res => {
                            console.log(res)
                          })
                          .catch(err => {
                            alert(err)
                          })

                          props.cancelConfirmation()
                        }}>cancel confirmation</Button></td>
                    </tr>
                )
                break
            }
            // else show all hotels in the area inside the bidding process
            arr.push(
                <tr>
                    <td>{props.data[i].id}</td>
                    <td>{props.data[i].category}</td>
                    <td>{props.data[i].type}</td>
                    <td>
                        <Link to={{
                        pathname: '/HotelDetails',
                        hotel_name: props.data[i].name
                        }}> {props.data[i].name} </Link>
                    </td>
                    <td>{props.data[i].price}</td>
                    <td><Button value={[props.data[i].name, props.data[i].id]} variant="dark" onClick={(e) => {
                        axios.put(`http://localhost:5000/confirmbid`, {
                            requestid: requestid,
                            hotelname: e.target.value.split(",")[0],
                            hotelid: e.target.value.split(",")[1],
                            confirmed: "1",
                        })
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            alert(err)
                        })

                        props.setConfirmed(e.target.value.split(",")[0])
                    }}>confirm bid</Button></td>
                </tr>
            )
        }
        return arr 
    }

    const classes = useStyles();
    const Home = () =>{ 
      let path = `/`; 
      history.push(path);
    }
    const userdashboard = () =>{ 
      let path = `/UserDashboard`; 
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
            <Typography variant="h6" noWrap >
              USER BID DASHBOARD
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
                  <ListItemIcon><button onClick={userdashboard}><DashboardIcon/></button>User DashBoard</ListItemIcon>                
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
          { buttonsHelper() }
          <Table striped bordered hover>
              <thead>
                  <tr>
                      <th>id</th>
                      <th>category</th>
                      <th>type</th>
                      <th>name</th>
                      <th>price</th>
                      <th>confirmed?</th>
                  </tr>
              </thead>
              <tbody>
                  { table_rows() } 
              </tbody>
          </Table>
          { displayRequest() }
        </Table>
          </Typography>
        </main>
      </div>
            
    )
}

const mapStateToProps = state => {
    return {
        level: state.buttonReducer.level,
        status: state.buttonReducer.status,
        data: state.buttonReducer.data,
        requestId: state.buttonReducer.requestId,
        requestData: state.buttonReducer.request,
        confirmed: state.buttonReducer.confirmed,
        confirmed_with_hotel: state.buttonReducer.confirmed_with_hotel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLevel1: () => dispatch(setLevel1()),
        setLevel2: (param) => dispatch(setLevel2(param)),
        setLevel3: (param) => dispatch(setLevel3(param)),
        addHotels: (data) => dispatch(addHotels(data)),
        fetchRequest: (data) => dispatch(fetchRequest(data)),
        setRequestId: (id) => dispatch(setRequestId(id)),
        setConfirmed: (name) => dispatch(setconfirmed(name)),
        cancelConfirmation: () => dispatch(cancelconfirmation())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer)
