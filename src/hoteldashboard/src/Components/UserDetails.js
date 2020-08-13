import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import Style from './redux/Style.css'
import {connect} from 'react-redux'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import app from '../../../components/config/hotelfirebase';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
class UserDetails extends React.Component{
    constructor(props){
        super(props);
        this.home=this.home.bind(this);
        this.logout = this.logout.bind(this);
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


        axios.get('http://127.0.0.1:5000/chats')
        .then(res=>{
          console.log(res)
          this.filterChats(res)
        })
    

        console.log(this.props.location)
        if(this.props.location){
        console.log(window.localStorage.getItem("bidprice"))
        window.localStorage.setItem("id",this.props.location.id)
        window.localStorage.setItem("request_id",this.props.location.request_id)
        window.localStorage.setItem("hotel_id",this.props.location.hotel_id)
       

        }
        if(this.props.location.details){

            window.localStorage.setItem("rooms",this.props.location.details.rooms)
            window.localStorage.setItem("budget",this.props.location.details.budget)
            window.localStorage.setItem("people",this.props.location.details.people)
            window.localStorage.setItem("hall",this.props.location.details.hall)
            window.localStorage.setItem("food",this.props.location.details.food)
        }
        if(this.props.location.bidprice){
        window.localStorage.setItem("bidprice",this.props.location.bidprice)

        }
        if(this.props.location.userId && this.props.location.user_email){

            window.localStorage.setItem("username",this.props.location.username)
            window.localStorage.setItem("user_email",this.props.location.user_email)

        }
        if(this.props.location.userId){
            window.localStorage.setItem("user_id",this.props.location.userId)

        }
        if(this.props.location.flag){
            window.localStorage.setItem("flag",this.props.location.flag)
            // alert(this.props.location.flag)
        }




        console.log(window.localStorage.getItem("user_id"))

        
        
        
    }

    filterChats=(res)=>{
        console.log(res.data.chats.length)
        var filtered_chats=[]
        // console.log(res.data.chats[0].hotelId)
        for(var i=0;i<res.data.chats.length;i++){
            if (res.data.chats[i].hotelId===parseInt(window.sessionStorage.getItem("hotelId"))){
                // console.log(i)
                filtered_chats.push(res.data.chats[i])

            }
            
        }
        console.log(filtered_chats)
        this.props.set_chat(filtered_chats)
        // console.log(filtered_chats)
    }

    put_request=(request_id,hotel_id,bidprice)=>{
        console.log("inside_put")
        alert("updated bidprice")
           return fetch("http://127.0.0.1:5000/sendrequeststohotels",{
               method: 'PUT',
               headers: {'Content-type': 'application/json'},
               body:JSON.stringify({
                   requestId:request_id,
                   hotelId:hotel_id,
                   bidprice:bidprice

               })
           });
       
    }
    delete_req=(request_id)=>{
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
        this.props.delete_item(request_id)
    }
    render()
    {
       
        console.log(window.localStorage.getItem("flag"))
        console.log(this.props.location)
        console.log(this.props.hotel_req)
        console.log(this.props.updated_bid_price)
      
        const updateBid=(e,request_id,hotel_id)=>{
         
            var updated_price= e.target.value
           
            this.props.update_bid_price(e.target.value)
            this.props.update_price(parseInt(updated_price),this.props.location.index)

        
        }
        
   
        const handleSubmit=(request_id,hotel_id,new_bid_price)=>{
            this.put_request(request_id,hotel_id,new_bid_price)

            

    
        }

    const yes_no=()=>{
        if(this.props.location.value===1)
            return "YES"
        return "NO"
    }
    const show_current_bid=()=>{
        if(this.props.location.bidprice){
            // window.localStorage.setItem("bid")
            return this.props.location.bidprice

        }
        return window.localStorage.getItem("bidprice")
        
    }
    console.log(this.props)
    var filter_chats=[]

    for(var i=0;i<this.props.chats.length;i++){
        console.log(this.props.chats[i].userId)
        if(this.props.chats[i].userId===parseInt(window.localStorage.getItem("user_id"))){
            // console.log("yes")
            filter_chats.push(this.props.chats[i])
        }
    }
// 
    console.log(filter_chats)
    
    const render_chats=filter_chats.map((chat,index)=>{
        return(
     
            <div className={chat.sender===0? 'align-right':'bubble'}>
                {chat.message}
                <br/>
                <p className="time">{chat.timestamp.slice(11,23)}</p>
            </div>
                

        )
    })

    const send_message=()=>{
        var a=document.getElementById("send_this")
        // console.log(a.value)
        var message1=a.value
        a.value=""
        var date= new Date();
        var utc=date.getTime()+(date.getTimezoneOffset()*60000);
        var ind=new Date(utc+(3600000+5.5))
        var ist=ind.toLocaleString()
        console.log(ist)
        console.log(date)
        console.log(window.localStorage.getItem("username"))
        // console.log(date.toLocaleTimeString('en-US'));
        // var b=document.getElementsByClassName("render_chats")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hotelname: window.sessionStorage.getItem("hotelname"),
                username: window.localStorage.getItem("username"),
                useremail: window.localStorage.getItem("user_email"),
                message: message1,
                sender: 0,
                timestamp:date.toLocaleString()
            })
        };
        const response = fetch("http://localhost:5000/chats", requestOptions);
        response.then(res => {
            console.log(res)
        })
        var last_id=0
        if(this.props.chats[this.props.chats[this.props.chats.length-1]]){
        last_id=this.props.chats[this.props.chats.length-1].chatId
        }
        console.log(last_id)
        var row={chatId:last_id+1,hotelId:1,message:message1,sender:0,userId:3,timestamp:date.toLocaleString()}
        console.log(row)
        var new_chats=this.props.chats
        new_chats.push(row)
        this.props.add_message(new_chats)
        
}
const check_flag_bidprice=()=>{
    if(parseInt(window.localStorage.getItem("flag"))==1){
        return(
            <div>
                <label>update price</label>
                <input type="text" onBlur={(e)=>{updateBid(e,parseInt(window.localStorage.getItem("request_id")),parseInt(window.localStorage.getItem("hotel_id")))}} id={parseInt(window.localStorage.getItem("id"))}></input>
                <button onClick={()=>handleSubmit(parseInt(window.localStorage.getItem("request_id")),parseInt(window.localStorage.getItem("hotel_id")),this.props.updated_bid_price)}> submit</button>
            </div>
        )
    }

}
const check_flag_retract=()=>{
    if(parseInt(window.localStorage.getItem("flag"))==1){
        return(
            <div>
                <button className="retract_button" onClick={()=>{this.delete_req(parseInt(window.localStorage.getItem("request_id")))}}>
                <switch><Link to="/HotelbidDashboard">retract</Link></switch></button>

            </div>
        )
    }
}
const check_flag_chat=()=>{
    if(parseInt(window.localStorage.getItem("flag"))==1){
        return(
        <div className="send">
            <textarea className="send_text" id="send_this"></textarea>
            <button className="send_button" onClick={send_message}>-></button>
        </div>
        )
    }
}
       
    console.log(this.props)
    // console.log(window.localStorage.getItem("user_id"))
    return(
    <Container component="main">
        <CssBaseline/>
        <AppBar position="fixed">
              <Toolbar>
                    <Box display='flex' flexGrow={1}>
                    <ListItemIcon><Button onClick={this.home}>Home<HomeIcon color="secondary"/></Button></ListItemIcon>                 
                      &nbsp;
                      <ListItemIcon><Button onClick={this.logout}>Log Out<ExitToAppIcon/></Button></ListItemIcon> 
                      &nbsp;
                    <ListItemIcon><Button onClick={this.confirmed}>Confirmed Requests<ConfirmationNumberIcon/></Button></ListItemIcon>
                </Box>  
                <Box display="flex" flexGrow={1}>        
                <Typography variant="h6" position="fixed">
                HOTEL BID DASHBOARD
                </Typography>
                </Box>             
              </Toolbar>
            </AppBar>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <div className="userReq">
            <h3>Request Details</h3>
           
            <label>current bidprice</label>
            <textarea className="details_bid" value={window.localStorage.getItem("bidprice")}></textarea>
            <br/>
            {check_flag_bidprice()}
            <div className="requirements">
                <p> Number of rooms: {window.localStorage.getItem("rooms")}</p>
                <p>budget: {window.localStorage.getItem("budget")}</p>
                <p>Number of people: {window.localStorage.getItem("people")}</p>
                <p>Hall type: {window.localStorage.getItem("hall")}</p>
                <p>food requirements: {window.localStorage.getItem("food")}</p>
                <p>snacks required:{yes_no()}</p>
                
            </div>
            {check_flag_retract()}
    
            

        </div>
        </Grid>
        <Grid item xs={12}>
        <div className="chats">
                <h3 className="queries-header">Queries</h3>
                <div className="render_chats" id="render">
                   
                    {render_chats}
                </div>
                {check_flag_chat()}
               
                
                
        </div>
        </Grid>
        </Grid>
        </Container>
        
    )}
}

const mapStateToProps=(state)=>{
    return{
        hotel_req:state.Reducers.hotel_req,
        login_id:state.Reducers.login_id,
        updated_bid_price:state.Reducers.updated_bid_price,
        chats:state.Reducers.chats

    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        update_price:(updated_price,index)=>{dispatch({type:'UPDATE_PRICE',updated_price:updated_price,index:index})},
        delete_item :(request_id)=> {dispatch({type:'DELETE_ITEM',request_id:request_id})},
        set_chat:(filtered_chats)=>{dispatch({type:'SET_CHAT',filtered_chats:filtered_chats})},
        add_message:(new_chats)=>{dispatch({type:'ADD_MESSAGE',new_chats:new_chats})},
        update_bid_price:(value)=>{dispatch({type:'UPDATE_BID_VARIABLE',value:value})}


    }
}

export default connect(mapStateToProps,mapDispatchToProps) (UserDetails)