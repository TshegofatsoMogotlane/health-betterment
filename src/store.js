// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Named import for thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import { listingListReducers } from './reducers/listingReducers';
import { modalReducer } from './reducers/modalReducer';
import { userLoginReducer, userSignupReducer } from './reducers/userReducer'; // Import userSignupReducer

const reducer = combineReducers({
  listingList: listingListReducers,
  modal: modalReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer, // Add userSignupReducer here
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  userSignup: {}, // Initialize userSignup state
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;



