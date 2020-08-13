import { SEND, RECEIVE } from "./chatTypes"

export const sendMessage = (message) => {
    return {
        type: SEND,
        payload: message 
    }
}

export const receiveMessage = (message) => {
    return {
        type: RECEIVE,
        payload: message
    }
}