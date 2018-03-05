import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//import placeReducer from './reducers/places';
//import uiReducer    from './reducers/ui';

const rootReducer = combineReducers({
    //places:placeReducer,
    //ui:uiReducer,
});

const StoreConfiguration = ()=>{
    return createStore(rootReducer,applyMiddleware(thunk));
};

export default StoreConfiguration;