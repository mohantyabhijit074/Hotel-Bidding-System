import {LEVEL1, LEVEL2, LEVEL3, ADD_HOTELS, FETCH_REQUEST, SET_REQUEST_ID, CONFIRMED, CANCEL_CONFIRMATION} from './buttonTypes'

//import five_star_business from '../../json_files/5star_business.json'
import four_star_business from '../../json_files/four_star_business.json'
import all_hotels from '../../json_files/all_hotels.json'
import five_star_resort from '../../json_files/five_star_resort.json'
import four_star_resort from '../../json_files/four_star_resort.json'
import overall_lowest from '../../json_files/overall_lowest.json'
import { act } from 'react-dom/test-utils'

const initalState = {
    level: 1,
    status: "",
    data: all_hotels,
    requestId: 0,
    request: {},
    confirmed: 0,
    confirmed_with_hotel: ""
}

// temporary function to demonstrate where sql filtering commands will be located
function filterFunction(data) {
    // TODO: add sql commands inplace of the loop below
    var temp=[]
        for(var i=0; i<data.length; i++) {
            if (data[i].type === "business" && data[i].category == "5 star") {
                temp.push({"category": data[i].category, "type": data[i].type,
                           "name": data[i].name, "price": data[i].price, "id": data[i].id,
                            "requirement_rating": data[i].requirement_rating })
            }
        }
    return temp;
}

const buttonReducer = (state = initalState, action) => {
    switch(action.type) {
        case CONFIRMED:
            alert("booking confirmed")
            return {
                ...state,
                confirmed: 1,
                confirmed_with_hotel: action.hotelname
            }
        case CANCEL_CONFIRMATION:
            return{
                ...state,
                confirmed: 0,
                confirmed_with_hotel: ""
            }
        case ADD_HOTELS:
            return {
                ...state,
                data: action.hoteldata
            }
        case FETCH_REQUEST:
            return {
                ...state,
                request: action.data
            }
        case SET_REQUEST_ID:
            return {
                ...state,
                requestId: action.id 
            }
        /*  FILTER DATA ACTION */
        case LEVEL1:
            console.log("level1")
                return {
                    ...state,
                    level: 1,
                    status: ""
                }
        case LEVEL2:
            console.log("level2")
            return {
                ...state,
                level: 2,
                status: action.payload
            }
        case LEVEL3: {
            switch(action.payload) {
                
                case "five_star_business":
                    var data = filterFunction(state.data)
                    return {
                        ...state,
                        level: 3,
                        status: action.payload,
                        data: data
                    }
                case "four_star_business":
                    return {
                        ...state,
                        level: 3,
                        status: action.payload,
                        data: four_star_business
                    }
                case "five_star_resort":
                    return {
                        ...state,
                        level: 3,
                        status: action.payload,
                        data: five_star_resort
                    }
                case "four_star_resort":
                    return {
                        ...state,
                        level: 3,
                        status: action.payload,
                        data: four_star_resort
                    }
                case "overall":
                    return {
                        ...state,
                        level: 3,
                        status: action.payload,
                        data: overall_lowest
                    }
                default:
                    return {
                        ...state,
                        level: 3,
                        status: 'ERROR LOADING JSON FILE',
                        data: {}
                    }
            }
        }
        default: 
            return state 
    }
}

export default buttonReducer
