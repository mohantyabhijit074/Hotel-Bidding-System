import React, {useEffect, useState, useCallback, useReducer} from 'react'
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'

import axios from 'axios'

import { receiveMessage } from './redux/chatActions'

function HotelDetails(props) {

    const [hotel_name, set_hotel_name] = useState("")
    const [user_name, set_user_name] = useState("")
    const [user_email, set_user_email] = useState("")
    const [user_id, set_user_id] = useState(0)
    const [hotel_id, set_hotel_id] = useState(0)
    const [message, set_message] = useState("")

     const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hotelname: hotel_name,
                username: user_name,
                useremail: user_email,
                message: message,
                sender: 1,
                timestamp: new Date().toLocaleString()
            })
            };
            const response = fetch('http://localhost:5000/chats', requestOptions);
            response.then(res => {
                console.log(res)
            })
    })
    

    // equivalent to componentDidMount
    useEffect(
         () => {
            
            if (props.location.hotel_name != null) {
                window.localStorage.setItem('hotelName', props.location.hotel_name)
                set_hotel_name(props.location.hotel_name)
            }
            else {
                set_hotel_name(window.localStorage.getItem('hotelName'))
            }


            axios.get("http://localhost:5000/getuserid")
            .then(res => {
                //console.log(res.userId)
                set_user_name(res.data.username)
                set_user_email(res.data.email)
                set_user_id(res.data.userId)
                //alert(user_id)
            })
            .catch(err => {
                alert(err)
            })

            const encodedValue = encodeURIComponent(hotel_name)
            axios.get(`http://localhost:5000/gethotelid?hotelname=${encodedValue}`)
            .then(res => {
                console.log(res)
                set_hotel_id(res.data.hotelId)
                //alert("hotelId =" + hotel_id)
            })
            .catch(err => {
                alert(err)
            })

            axios.get('http://localhost:5000/chats')
            .then(res => {
                console.log(res.data.chats[0])
                props.receiveMessage(res.data.chats)
            })
            .catch(err => {
                alert(err)
            })

            console.log(user_name + ", " + user_id)
        }, [user_name, user_id, hotel_id, user_email]
    )

    const showMessages = () => {
        // alert("state userId = " + this.state.userId)
           var temp = []
           console.log("data")
           console.log(props.message)
           console.log(props.message.length)
           for (var i=0; i<props.message.length; i++) {
               if (props.message[i].userId == user_id && props.message[i].hotelId == hotel_id) {
                    var sender = "user"
                    if (props.message[i].sender === 0)
                        sender = "hotel"
                    temp.push(
                        <div>
                            <p>{sender}: {props.message[i].message}  <sub>{props.message[i].timestamp}</sub></p>
                            
                        </div>
                    )
               }
               
           }

           return temp
       }

    return (
        <div>
            <p><h1>Hotel name = {hotel_name}</h1></p>
            {showMessages()}
            <form onSubmit={handleSubmit}>
                <textarea name="queries" placeholder="queries?" onChange={(event) => {set_message(event.target.value)}}></textarea>
                <input type="submit" value="submit" />
            </form>
            <switch>
                <Link to="/userhome"><button type="submit" onClick={() => alert("booking confirmed!")}>confirm booking</button></Link>
            </switch>
            <switch>
                <Link to="/userbiddashboard"><button>back</button></Link>
            </switch>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        message: state.chatReducer.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveMessage: (param) => dispatch(receiveMessage(param))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetails)
