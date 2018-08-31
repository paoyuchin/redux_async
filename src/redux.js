import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// actions.js
//step 3. decide what actions will be used

export const addRepo = repo => ({
  type: "ADD_REPO",
  repo
});

export const clearRepo = () => ({
  type: "CLEAR_REPO"
});

export const getRepo = userName => async dispatch => {
  try {
    const url = `https://api.github.com/users/${userName}/repos?sort=updated`;
    const response = await fetch(url);
    const resData = await response.json();
    dispatch(addRepo(resData));
  } catch (error) {
    console.log("sth error occured");
    dispatch(clearRepo());
  }
};

// reducers.js

export const repos = (state=[] , action ) =>{
switch(action.type){
  case 'ADD_REPO':
    return action.repo
  case 'CLEAR_REPO':
    return [];
  default:
    return state;
}
};

export const reducer = combineReducers({repos});

// store.js

export const store = createStore(reducer, applyMiddleware(thunk, logger));