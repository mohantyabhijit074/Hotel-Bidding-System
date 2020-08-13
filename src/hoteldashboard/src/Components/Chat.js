import React from 'react'
import {Link} from 'react-router-dom'
import Style from './redux/Style.css'
import {connect} from 'react-redux'
// import Reducers from './redux/Reducer'
// import axios from 'axios'
// import Redcucers from './redux/Reducers'
import ReactDOM from 'react-dom'

var hotelId=window.sessionStorage.getItem("hotelId")
class Chat extends React.Component{
    render(){
        // console.log(this.props.chats[7].timestamp)
        // console.log(hotelId)
        var filter_chats=[]
    
        for(var i=0;i<this.props.chats.length;i++){
            console.log(i)
            if(this.props.chats[i].userId===this.props.userId){
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
            console.log(a.value)
            var message1=a.value
            a.value=""
            var date= new Date();
            var utc=date.getTime()+(date.getTimezoneOffset()*60000);
            var ind=new Date(utc+(3600000+5.5))
            var ist=ind.toLocaleString()
            console.log(ist)
            console.log(date)
            console.log(this.props.username)
            // console.log(date.toLocaleTimeString('en-US'));
            // var b=document.getElementsByClassName("render_chats")
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hotelname: window.sessionStorage.getItem("hotelname"),
                    username: this.props.username,
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
            // const new_msg=React.createElement("div",{className:"align-right"},message1)
            // // new_msg.className="align-right"
            // ReactDOM.render(
            //     new_msg,
            //     document.getElementById("render")
            // )
            // console.log(new_chats)

            // window.history.go(-1)
            // window.location.reload(true)
            // window.location.replace('http://localhost:3000/HotelbidDashboard')
            this.props.add_message(new_chats)
    }
    console.log(this.props.chats)

            // var c=document.createElement()
           


        return(
            <div className="chats">
                {/* <h1>In Chattt</h1> */}
                {/* <div className="close-chat">
                <switch>
                    <Link to="/hotelBidDashboard" className="X-chat">X</Link>
                </switch>
                </div> */}
                <h3 className="queries-header">Queries</h3>
                <div className="render_chats" id="render">
                   
                    {render_chats}
                </div>
                <div className="send">
                    <textarea className="send_text" id="send_this"></textarea>
                    <button className="send_button" onClick={send_message}>-></button>
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        hotel_req:state.Reducers.hotel_req,
        chats:state.Reducers.chats

    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        add_message:(new_chats)=>{dispatch({type:'ADD_MESSAGE',new_chats:new_chats})}

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Chat)