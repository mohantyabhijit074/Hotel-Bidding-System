import React from 'react'
import {connect} from 'react-redux'
import Style from './redux/Style.css'
import {Link,useHistory} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import { Table, AccordionCollapse } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import app from '../../../components/config/hotelfirebase';
import { lightGreen } from '@material-ui/core/colors';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

// const session_hotel_name=window.sessionStorage.getItem("hotelname")
// console.log(session_hotel_name)


  const renderUser=(users,index,props)=>{
      // console.log(props)
        return(
          <div>

          <tr key={index} className="table_data">
            <td> {users.username}</td>
            <td><textarea  className="textbox">{users.bidprice}</textarea></td>
            <td>{users.confo_date}</td>
            <td ><button>retract</button></td>
          </tr>
          
        
          </div>
        )
        
        }
      
    // let count=Object.keys(users).length;
    
  
class Container extends React.Component{
      constructor(props){
        super(props);
        this.home=this.home.bind(this);
        this.logout = this.logout.bind(this);
        this.confirmed = this.confirmed.bind(this);
      }
    home(){
        let path = `/`;
    this.props.history.push(path);
      }
    logout(){
      app.auth().signOut();
      let path = `/hotelhome`;
    this.props.history.push(path);
    }
    confirmed(){
      let path = `/ConfirmedRequests`;
      this.props.history.push(path);
    }
      componentDidMount(){
        
      
        axios.get('http://127.0.0.1:5000/hotels')
        .then(res=>{
          // console.log(res)
          // console.log(res.data)
          // console.log(res.data.hotels[0][1].name)
        
          this.setHotelId(res)
        })
       

        axios.get('http://127.0.0.1:5000/hotel_bid_dashboard')
        .then(
          res=>{
            // console.log(res.data[0].hotel_id)
            this.filter_based_on_hotel(res)
          }
        )

        axios.get('http://127.0.0.1:5000/requests')
        .then(res=>{
          // console.log(res)
          this.setRequests(res)
        
          // console.log(this.props.hotel_req.length)
        })
        axios.get("http://127.0.0.1:5000/confirms")
        .then(res=>{
          this.remove_confirmed_requests(res)
        })

      }

      remove_confirmed_requests=(res)=>{
        console.log(this.props.dashboard_data.length)
        console.log(res.data.confirms)
        for(var i=0;i<res.data.confirms.length;i++){
          for(var j=0;j<this.props.dashboard_data.length;j++){
            if(res.data.confirms[i].requestId===this.props.dashboard_data[j].request_id &&
              res.data.confirms[i].hotelId===this.props.dashboard_data[j].hotel_id){
                this.props.delete_entry(this.props.dashboard_data[j].request_id)
                // this.delete_request(this.props.dashboard_data[j].request_id)
                console.log(j)
                // console.log(this.props.dashboard_data[j])
                
              }
          }
        }
      }
      delete_request=(request_id)=>{
        console.log(request_id)
        console.log(this.props.login_id)
        fetch("http://127.0.0.1:5000/sendrequeststohotels",{
               method: 'DELETE',
               headers: {'Content-type': 'application/json'},
               body:JSON.stringify({
                   requestId:request_id,
                   hotelId:this.props.login_id

               })
           });
        // this.props.delete_item(request_id)
    }
      filter_based_on_hotel=(res)=>{
        var filtered_requests_to_hotel=[]
        for(var i=0;i<res.data.hotel_bid_dashboard.length;i++){
          if(res.data.hotel_bid_dashboard[i].hotel_id===this.props.login_id){
            filtered_requests_to_hotel.push(res.data.hotel_bid_dashboard[i])
          }
        }
        for(var j=0;j<filtered_requests_to_hotel.length;j++){
          if(!filtered_requests_to_hotel[j].bidprice){
            filtered_requests_to_hotel[j].bidprice='0'
          }
        }
        console.log(filtered_requests_to_hotel)

        this.props.set_dashboard_data(filtered_requests_to_hotel)

      }

  
      setHotelId=(res)=>{
        var session_hotel_id=0
        console.log(res.data.hotels)
        for(var i=0;i<res.data.hotels.length;i++){
          if(res.data.hotels[i].name===window.sessionStorage.getItem("hotelname")){
            session_hotel_id=i+1
            console.log(session_hotel_id)
            window.sessionStorage.setItem("hotelId",session_hotel_id)
            console.log(window.sessionStorage.getItem('hotelId'))
            
          }
        }
        this.props.set_login_id(session_hotel_id)
       


      }
      setUsers=(res)=>{
        var requested_users=[]
        // console.log(this.props.hotel_req[1].requestId)
        console.log(res.data[1].requestId)
        for(var i=0;i<this.props.hotel_req.length;i++){
          for(var j=0;j<res.data.length;j++){
            if(this.props.hotel_req[i].requestId===res.data[j].requestId){
                requested_users.push(res.data[j])
            }
          }
        }
        console.log(requested_users)
        this.props.set_requested_users(requested_users)
      }
      setRequests=(res)=>{
        console.log(this.props)
        var requests=[]
        for(var i=0;i<this.props.dashboard_data.length;i++)
        {
            for(var j=0;j<res.data.requests.length;j++)
            {
              if(this.props.dashboard_data[i].request_id===res.data.requests[j].id){
                requests.push(res.data.requests[j])
              }

            }
          
        }
        console.log(requests)
        this.props.set_request_details(requests)

      }
      hotelRequests=(res)=>{
        console.log(res.data[0])
        var hotel_req=[]
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].hotelId===this.props.login_id){
            hotel_req.push(res.data[i])
          }
        }
        console.log(hotel_req)
        this.props.set_hotel_requests(hotel_req)
      }
      // appendBidPrice(res){
      //   var bid_price=[]
        


      // }
      // setLoginId=(res,last)=>{
      //   this.props.set_login_id(res,last)
      // }
      updateUser = (res)=>{
        console.log(res)
        var filter_users=[]
        console.log(this.props.requested_users)
        for(var i=0;i<this.props.requested_users.length;i++){
          for(var j=0;j<res.data.users.length;j++){
            if(j+1===this.props.requested_users[i].UserId){
              filter_users.push(res.data.users[j][j+1])
            }
          }
         
        }
        console.log(filter_users)
        console.log("in updateUser")
        this.props.insert_users(filter_users)
      }

        
      handleChange = (id) =>{
        this.props.deleteItem(id)
        // this.props.updateCount()
      }
      handleUpdate = (id) =>{
        var value=document.getElementById(id).value
        this.props.updateItem(id,value)
        // console.log(value)
      }
   
      render(){
      console.log(this.props)
      console.log(window.sessionStorage.getItem("hotel_email"))
      
      //var count=this.props.hotel_req.length;

      const hotel_bid_dashboard_data=this.props.dashboard_data.map((request,index)=>{
   
        if(this.props.dashboard_data[0]){
          return(
            <tr>
              {/* <td>{this.props.dashboard_data[index].username}</td> */}
            <td><Link to={{pathname:'/UserDetails',details:this.props.request_details[index],bidprice:request.bidprice,index:index,request_id:request.request_id,hotel_id:request.hotel_id,username:request.username,userId:request.user_id,user_email:request.user_email, flag:1}}>{request.user_email}</Link></td>
              <td>{this.props.dashboard_data[index].bidprice}</td>
              <td>{this.props.dashboard_data[index].confirmation_date}</td>
              {/* <td><Link to ={{pathname:'/Chats',userId:request.user_id,username:request.username}}>chat</Link></td> */}

            </tr>
          )
        }
      })  

      
          
     
           return(
            <div className="display:flex">
            <CssBaseline />
            <AppBar position="fixed">
              <Toolbar>
                    <Box display='flex' flexGrow={1}>
                    <ListItemIcon><Button onClick={this.home}>Home<HomeIcon color="secondary"/></Button></ListItemIcon>                 
                      &nbsp;
                    <ListItemIcon><Button onClick={this.logout}>Log Out<ExitToAppIcon/></Button></ListItemIcon> 
                    &nbsp;
                    <ListItemIcon><Button onClick={this.confirmed}>Confirmed Requests<ConfirmationNumberIcon/></Button></ListItemIcon> 
                </Box>  
                <Box display="flex" flexGrow={1} >        
                <Typography variant="h6" position="fixed">
                HOTEL BID DASHBOARD
                </Typography>
                </Box>
                  <ListItemIcon><PeopleIcon/>Total Biddings {this.props.dashboard_data.length}</ListItemIcon>                
                
              </Toolbar>
            </AppBar>
             {/*<Navbar color="dark" dark expand="md">
              <NavbarBrand><Button onClick={this.home}>Home<HomeIcon color="secondary"/></Button></NavbarBrand>
              <NavbarBrand><Button onClick={this.logout}>Log Out<ExitToAppIcon/></Button></NavbarBrand>
              <NavbarBrand className="m-auto">HOTEL BIDDING DASHBOARD</NavbarBrand>
              <NavbarBrand  className="ml-auto"><Button><PeopleIcon/>TotaL Biddings {this.props.dashboard_data.length}</Button></NavbarBrand>
            </Navbar>*/}

            <main className="flexGrow: 1">
              <Toolbar />
              <div className="container">
              <Typography paragraph>
              <Table striped bordered hover >
                  <thead>
                      <tr>
                          <th>Username</th>
                          <th>BidPrice</th>
                          <th>Confo Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      { hotel_bid_dashboard_data } 
                  </tbody>
              </Table>
              </Typography>
              </div>
            </main>
          </div>
           
           ) 
      }

    }

 const mapStateToProps=(state)=>{
   return{
    users:state.Reducers.users,
    request_details:state.Reducers.request_details,
    login_id:state.Reducers.login_id,
    count: state.Reducers.count,
    hotel_req:state.Reducers.hotel_req,
    requested_users:state.Reducers.requested_users,
    chats:state.Reducers.chats,
    dashboard_data:state.Reducers.dashboard_data
   }
 }
 
 const mapDispatchToProps = (dispatch)=>{
   return{
       //retract:(users,index)=>dispatch(retract(users,index))
        deleteItem: (id) => {dispatch({type:'RETRACT',id:id})},
        updateItem: (id,value) =>{dispatch({type:'UPDATE',id:id,value:value})},
        // updateCount:()=>{dispatch({type:'UPDATE_COUNT'})},
        // addUserData: (res)=>{dispatch({type:'ADD_USER_DATA',user_data:res})},
        set_login_id: (session_hotel_id)=>{dispatch({type:'SET_LOGIN_ID',hotel_id:session_hotel_id})},
        set_hotel_requests:(hotel_req)=>{dispatch({type:'SET_HOTEL_REQUESTS',hotel_req:hotel_req})},
        set_request_details:(requests)=>{dispatch({type:'SET_REQUEST_DETAILS',requests:requests})},
        set_requested_users:(requested_users)=>{dispatch({type:'SET_REQUESTED_USERS',requested_users:requested_users})},
        insert_users:(filter_users)=>{dispatch({type:'INSERT_USER',filter_users:filter_users})},
        set_dashboard_data:(filtered_requests_to_hotel)=>{dispatch({type:"SET_DASHBOARD_DATA",dashboard_data:filtered_requests_to_hotel})},
        delete_entry:(requestId)=>{dispatch({type:'REMOVE_CONFIRMED_REQUESTS',requestId:requestId})}
   }
 }
 
   
       

 export default connect(mapStateToProps,mapDispatchToProps) (Container)
//export default Container
  
