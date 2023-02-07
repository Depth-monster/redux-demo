const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
  pending: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";

const fetchUsersReq = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
const fetchUsersSucc = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fetchUsersFail = (error) => {
  return {
    type: FETCH_USERS_FAIL,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        users: action.payload,
      };
    case FETCH_USERS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//api requests
const fetchActionCreator = () => {
  return function (dispatch) {
    dispatch(fetchUsersReq());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        //res.data array of users
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSucc(users)); //giving users
      })

      .catch((error) => {
        dispatch(fetchUsersFail(error.message));
      });
  };
};
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log("aaaaaaaaaa", store.getState());
});
store.dispatch(fetchActionCreator());
