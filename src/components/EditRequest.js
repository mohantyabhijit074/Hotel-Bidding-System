import React from 'react'
import submit from './submit'
import Editrequestform from './Forms/Editrequest'
import {Provider} from 'react-redux';
import store from '../reducer/reducer';
import "../App.css";
export default function Editrequest() {
    return (
        <Provider store={store}>
        <div>
        <Editrequestform onSubmit={submit}/>
        </div>
        </Provider>
    )
}