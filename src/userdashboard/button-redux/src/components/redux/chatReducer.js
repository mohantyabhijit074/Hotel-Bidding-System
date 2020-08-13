
import { RECEIVE, SEND } from './chatTypes'

const initialState = {
    message: ""
}

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE:
            //alert("message received")
            console.log(action.payload)
            return {
                ...state,
                message: action.payload
            }
        case SEND: 
            return {
            ...state,
            message: ""
            }
        default:
            return state 
    }
}

export default chatReducer