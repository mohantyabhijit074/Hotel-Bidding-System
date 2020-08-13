 
import Container from '../Container'
// import Session from './../Session'
import UserDetails from './../UserDetails'

const initialState={
    users:[],
    request_details:[],
    count:0,
    login_id:0,
    bidprice:[],
    hotel_req:[],
    requested_users:[],
    chats:[],
    confirmed_requests:[],
    confirmed_req_ids:[],
    updated_bid_price:0,
    dashboard_data:[],
    confirmed_requests_table:[]
}


const Reducers=(state=initialState,action)=>{
let newvalue=state.data
  
  if(action.type==='UPDATE_PRICE'){
      var new_dashboard_data=state.dashboard_data
      new_dashboard_data[action.index].bidprice=action.updated_price
      console.log(new_dashboard_data[action.index])
      console.log(new_dashboard_data)

      return{
          ...state,
          hotel_req:new_dashboard_data
          
          
          
      }
  }

  if(action.type==='SET_CONFIRMED_TABLE_DATA'){
      return{
          ...state,
          confirmed_requests_table:action.confirmed_requests_table
      }
  }
  if(action.type==='SET_CONFIRMED_REQUESTS'){
      return{
          ...state,
          confirmed_requests:action.confirmed_requests
      }
  }

  if(action.type==='SET_DASHBOARD_DATA'){
      return{
          ...state,
          dashboard_data:action.dashboard_data
      }
  }
  if(action.type==='UPDATE_BID_VARIABLE'){
      console.log("in reducer")
      console.log(action.value)
      return{
          ...state,
          updated_bid_price:action.value
      }
  }
  if(action.type==='INSERT_USER'){
      return{
          ...state,
          users:action.filter_users
      }
  }
  
  if(action.type==='ADD_MESSAGE'){
    
      return{
          ...state,
          chats:action.new_chats
          
      }
  }
  if(action.type==='DELETE_ITEM')
  {
    let newRequests=state.hotel_req.filter(request =>{
        return action.request_id!== request.requestId
    });
    return {
        ...state,
        hotel_req:newRequests
    }
  }

  if(action.type==='REMOVE_CONFIRMED_REQUESTS')
  {
    let newRequests=state.dashboard_data.filter(request =>{
        return action.requestId!== request.request_id
    });
    return{
        ...state,
        dashboard_data:newRequests
    }
      
  }
  if(action.type==='SET_CHAT'){
     return{
         ...state,
         chats:action.filtered_chats
     }

  }
  if(action.type==='SET_REQUESTED_USERS'){
      return{
          ...state,
          requested_users:action.requested_users
      }

  }
  if(action.type==='SET_REQUEST_DETAILS')
  {
      return{
          ...state,
          request_details:action.requests
      }

  }
  else if(action.type==='SET_HOTEL_REQUESTS')
  {
    //   console.log(Session.getName())
      return{
          ...state,
          hotel_req:action.hotel_req
      }
  }
  else if(action.type==='SET_LOGIN_ID')
  {
      return{
          ...state,
          login_id:action.hotel_id
      }
  }

  else if(action.type==='ADD_USER_DATA')
  {
      
      return{
          ...state,
          users:action.user_data.data.users
      }
    

  }
  else if(action.type==='RETRACT'){
    let newRequests=state.hotel_req.filter(request =>{
        return action.id !== request.requestId
    });
    return {
        ...state,
        hotel_req:newRequests
    }}
   
    else if(action.type==='UPDATE_COUNT')
    {
        return{
        ...state,
        count:state.count-1
        }

    }
    return state;
  }
 


export default Reducers