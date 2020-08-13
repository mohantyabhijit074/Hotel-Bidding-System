import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import buttonReducer from '../userdashboard/button-redux/src/components/redux/buttonReducer'
import chatReducer from '../userdashboard/button-redux/src/components/redux/chatReducer'
import Reducers from '../hoteldashboard/src/Components/redux/Reducers'
const rootReducer = combineReducers({
  form: formReducer,
  buttonReducer: buttonReducer,
  chatReducer: chatReducer,
  Reducers:Reducers             //hotel

})

const store = createStore(rootReducer)

export default store