import React from 'react'
import {Provider} from 'react-redux';
import store from '../reducer/reducer';
import submit from './submit';
import HotelRegisterForm from './Forms/HotelRegisterForm'
function HotelRegister() {
    return (
        <Provider store={store}>
        <div>
        <HotelRegisterForm onSubmit={submit}/>
        </div>
        </Provider>
    )
}

export default HotelRegister
