import React from 'react'
import {Provider} from 'react-redux';
import store from '../reducer/reducer';
import submit from './submit';
import RegisterForm from './Forms/RegisterForm'
function Register() {
    return (
        <Provider store={store}>
        <div>
        <RegisterForm onSubmit={submit}/>
        </div>
        </Provider>
    )
}

export default Register
