import React from 'react'
import submit from './submit'
import RequestForm from './Forms/RequestForm'
import {Provider} from 'react-redux';
import store from '../reducer/reducer';

export default function Request() {
    return (
        <Provider store={store}>
        <div>
            <RequestForm />
        </div>
        </Provider>
    )
}
