import { combineReducers } from 'redux';

import DataReducer from './Reducer/DataReducer'

const rootReducer = combineReducers({
    imageData : DataReducer,
    // if there are other reducers , we can add here one by one
});
export default rootReducer;