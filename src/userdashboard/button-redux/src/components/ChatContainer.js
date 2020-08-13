import React from 'react'
import { connect } from 'react-redux'

import * as types from './redux/buttonTypes'

import axios from 'axios'
import { receiveMessage } from './redux/chatActions'

class ChatContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {userId: this.props.userid}
    }


    componentDidMount() {
        // alert("state userId = " + this.state.userId)
        axios.get('http://localhost:5000/chats')
        .then(res => {
            console.log(res.data.chats[0])
            this.props.receiveMessage(res.data.chats)
        })
        .catch(err => {
            alert(err)
        })

        alert(this.props.userid)
    }                    

        

    render() {

       const showMessages = () => {
        // alert("state userId = " + this.state.userId)
           var temp = []
           console.log("data")
           console.log(this.props.message)
           console.log(this.props.message.length)
           for (var i=0; i<this.props.message.length; i++) {
               if (this.props.message[i].userId == 3) {
                    var sender = "user"
                    if (this.props.message[i].sender === 0)
                        sender = "hotel"
                    temp.push(
                        <div>
                            <p>{sender}: {this.props.message[i].message}</p>
                        </div>
                    )
               }
               
           }

           return temp
       }

    // const showMessages = this.props.message.map(message => {
    //     return (
    //         <p> {message} </p>
    //     )
    // })
    

        return (
            <div>
                {showMessages()}
            </div>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)

