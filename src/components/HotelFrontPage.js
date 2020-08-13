import React from 'react'
import submit from './submit'
import Request from './Forms/HotelRequestForm'
import {Provider} from 'react-redux';
import store from '../reducer/reducer';
import "../App.css";
export default function HotelRequest() {
    return (
        <Provider store={store}>
        <div>
        <Request onSubmit={submit}/>
        </div>
        </Provider>
    )
}
