import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from './constants';

export const setSearchField = (text) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text,
});

// This async action will take 'dispatch'
// Doing () => dispatch => is a higher order function, return a function in a function
// the dispatch function is passed to it in order to provide a return object

/*
  requestRobots, without redux-thunk would not understand this, because redux expects a response 
  of an object
  With redux-thunk it listens to an action, it returns a function so dispatch is passed to let dispatch be used
  in the action to return the response
*/
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch((err) => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: err }));
};
