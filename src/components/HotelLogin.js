import React from 'react'
import {Provider} from 'react-redux';
import store from '../reducer/reducer';
import submit from './submit';
import HotelLoginForm from './Forms/hoteloginForm'
function HotelLogin() {
    return (
        <Provider store={store}>
        <div>
        <HotelLoginForm onSubmit={submit}/>
        </div>
        </Provider>
    )
}

export default HotelLogin
