import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Style from './redux/Style.css'
import Reducers from './redux/Reducers'
import { Table, AccordionCollapse } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors'


class ConfirmedRequests extends React.Component{

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/confirmed_requests')
        .then(res=>{
            console.log(res)
            this.filter_based_on_hotel(res)
        })

        axios.get('http://127.0.0.1:5000/requests')
        .then(res=>{
          // console.log(res)
          this.setRequests(res)
        
          // console.log(this.props.hotel_req.length)
        })
    }

    filter_based_on_hotel=(res)=>{
        var confirmed_requests_to_hotel=[]
        for(var i=0;i<res.data.confirmed_table_data.length;i++){
            if (res.data.confirmed_table_data[i].hotel_id===parseInt(window.sessionStorage.getItem("hotelId"))){
                confirmed_requests_to_hotel.push(res.data.confirmed_table_data[i])

            }
        }
        console.log(confirmed_requests_to_hotel)
        this.props.set_table_data(confirmed_requests_to_hotel)
    }
    setRequests=(res)=>{
        console.log(this.props)
        var requests=[]
        for(var i=0;i<this.props.confirmed_requests_table.length;i++)
        {
            for(var j=0;j<res.data.requests.length;j++)
            {
              if(this.props.confirmed_requests_table[i].request_id===res.data.requests[j].id){
                requests.push(res.data.requests[j])
              }

            }
          
        }
        console.log(requests)
        this.props.set_request_details(requests)

      }
   

    
    render(){
        // console.log(window.sessionStorage.getItem("hotelId"))
        console.log(this.props.confirmed_requests_table)

        const confirmed_requests_data=this.props.confirmed_requests_table.map((request,index)=>{
   
            if(this.props.confirmed_requests_table[0]){
              console.log(request.user_id)
              return(
                <tr>
                  {/* <td>{this.props.dashboard_data[index].username}</td> */}
                <td><Link to={{pathname:'/UserDetails',details:this.props.request_details[index],bidprice:request.bidprice,index:index,request_id:request.request_id,hotel_id:request.hotel_id,username:request.username,userId:request.user_id,flag:2}}>{request.user_email}</Link></td>
                  <td>{this.props.confirmed_requests_table[index].bidprice}</td>
                  <td>{this.props.confirmed_requests_table[index].confirmation_date}</td>
                  {/* <td><Link to ={{pathname:'/Chats',userId:request.user_id,username:request.username}}>chat</Link></td> */}
    
                </tr>
              )
            }
          })  
        return(
            <div className="container">
              {/* <Typography paragraph> */}

                <h2>
                  Confirmed Requests
                </h2>
                <Table striped bordered hover>
                  <thead>
                      <tr>
                          <th>Username</th>
                          <th>BidPrice</th>
                          <th>Confo Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      { confirmed_requests_data } 
                  </tbody>
              </Table>
             {/* </Typography> */}
            
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        dashboard_data:state.Reducers.dashboard_data ,
        confirmed_requests:state.Reducers.confirmed_requests,
        request_details:state.Reducers.request_details,
        confirmed_requests_table:state.Reducers.confirmed_requests_table

    }
}
const mapDispatchTOProps=(dispatch)=>{
    return{
        set_confirmed_requests:(confirmed_requests)=>{dispatch({type:'SET_CONFIRMED_REQUESTS',confirmed_requests:confirmed_requests})},
        set_request_details:(requests)=>{dispatch({type:'SET_REQUEST_DETAILS',requests:requests})},
        set_table_data:(confirmed_requests_to_hotel)=>{dispatch({type:'SET_CONFIRMED_TABLE_DATA',confirmed_requests_table:confirmed_requests_to_hotel})}

    }
}

export default connect(mapStateToProps,mapDispatchTOProps)(ConfirmedRequests)