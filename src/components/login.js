import React from 'react'
import {Provider} from 'react-redux';
import store from '../reducer/reducer';
import submit from './submit';
import LoginForm from './Forms/loginForm'
function Login() {
    return (
        <Provider store={store}>
        <div>
        <LoginForm onSubmit={submit}/>
        </div>
        </Provider>
    )
}

export default Login
