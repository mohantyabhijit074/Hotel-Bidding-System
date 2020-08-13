import {LEVEL1, LEVEL2, LEVEL3, ADD_HOTELS, FETCH_REQUEST, SET_REQUEST_ID, CONFIRMED, CANCEL_CONFIRMATION} from './buttonTypes'
import axios from 'axios'

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
export const setLevel1 = () => {
    return {
        type: LEVEL1
    }
}

export const fetchData = () => {
    console.log("inside fetch data")
    return {
        type: LEVEL1
    }
}

export const setLevel2 = (status) => {
    return {
        type: LEVEL2,
        payload: status // status is used to determine which json file to choose to convert to table format in level 3
    }
}

export const setLevel3 = (param) => {
    return {
        type: LEVEL3,
        payload: param  // param is same as status
    }
}

export const addHotels = (hoteldata) => {
    return {
        type: ADD_HOTELS,
        hoteldata 
    }
}

export const fetchRequest = (data) => {
    return {
        type: FETCH_REQUEST,
        data
    }
}

export const setRequestId = (id) => {
    return {
        type: SET_REQUEST_ID,
        id
    }
}

export const setconfirmed = (hotelname) => {
    return {
        type: CONFIRMED,
        hotelname
    }
}

export const cancelconfirmation = () => {
    return {
        type: CANCEL_CONFIRMATION
    }
}