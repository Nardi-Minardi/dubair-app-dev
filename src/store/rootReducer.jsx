import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  form: formReducer, // include formReducer in the combineReducers call
  auth: authReducer,
});

export default rootReducer;