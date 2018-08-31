import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// actions.js
//decide what actions will be used

export const addRepos = repos => (
  {
  type: "ADD_REPOS",
  repos
});

export const clearRepos = () => ({ type: "CLEAR_REPOS" });


export const getRepos = userName => async dispatch => {
  try {
    const url = `https://api.github.com/users/${userName}/repos?sort=updated`;
    //set url
    const response = await fetch(url);
    //use await method to fetch url
    const resData = await response.json();
    //use await method to change to json 
    dispatch(addRepos(resData));
    //dispatch result data to action from another action
  } catch (error) {
    console.log("error occured!!!!!!!!!!");
    dispatch(clearRepos());
  }
};

// reducers.js
export const repos = (state = [], action) => {
  switch (action.type) {
    case "ADD_REPOS":
      return action.repos;
    case "CLEAR_REPOS":
      return [];
    default:
      return state;
  }
};
export const reducers = combineReducers({ repos });

// store.js
export const store = createStore(reducers, applyMiddleware(logger , thunk));
