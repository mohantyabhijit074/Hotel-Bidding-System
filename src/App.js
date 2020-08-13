import React from 'react';
import './App.css';
import FrontPage from './components/FrontPage'
import './index.css';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Request from './components/Request';
import Register from './components/register';
import Login from './components/login';
// import hotelbiddashboard from './hoteldashboard/src/App';
import HomeRequest from "./components/HomeRequest";
import HotelRequest from "./components/HotelFrontPage";
import HotelRegister from "./components/hotelregister";
import HotelLogin from "./components/HotelLogin";
import {AuthProvider} from "./components/auth";
import {HotelAuthprovider } from "./components/hotelauth";
import PrivateRoute from "./components/privateRoute";
import HotelPrivateRoute from "./components/hotelprivateroute";
import Userdashboard from "./components/dashboard/userdashboard";
import ButtonContainer from './userdashboard/button-redux/src/components/ButtonContainer';
import HotelDetails from './userdashboard/button-redux/src/components/HotelDetails';
import EditRequest from "./components/EditRequest";
import store from './reducer/reducer'
import {Provider} from 'react-redux';
import Container from './hoteldashboard/src/Components/Container';
import UserDetails from './hoteldashboard/src/Components/UserDetails';
import Chat from './hoteldashboard/src/Components/Chat'
import ConfirmRequests from './hoteldashboard/src/Components/ConfirmedRequests'

function App() {
  return (
    // <Provider store={store}>
    <div className="App">
      <Provider store={store}>
      <AuthProvider>
      <HotelAuthprovider>
      <BrowserRouter>
      <Switch>
        <PrivateRoute path="/userdashboard" component={Userdashboard}/>
        <Route path="/hotellogin" component={HotelLogin}/>
        <Route path="/hotelregister" component={HotelRegister}/>
		    <Route path="/editrequest" component={EditRequest}/>
        <HotelPrivateRoute path="/hotelhome" component={HotelRequest}/>
        <PrivateRoute path="/userhome" component={HomeRequest}/>
        <Route path="/request" component={Request}/>
        <Route path="/register" component={Register}/>
        <Route path="/userbiddashboard" component={ButtonContainer}/>
        <Route exact path="/hotelDetails" component={HotelDetails} />
        <Route path="/HotelbidDashboard" component={Container}/>
        <Route exact path="/UserDetails" component={UserDetails}/>
        <Route exact path="/ConfirmedRequests" component={ConfirmRequests}/>
        <Route exact path='/Chats' component={Chat}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={FrontPage} />  
      </Switch>
      </BrowserRouter> 
      </HotelAuthprovider>
      </AuthProvider> 
      </Provider>
    </div>
  );
}

export default App;
