import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './slices/authSlice';
import videoReducer from './slices/videoSlice';

const rootReducer = combineReducers({
  form: formReducer, // include formReducer in the combineReducers call
  auth: authReducer,
  video: videoReducer,
});

export default rootReducer;