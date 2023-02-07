const redux = require("redux");

const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";

//there are three parts to implement:
//ACTION
//REDUCER
//STORE

//implementing action
function buyCake() {
  //action creator buyCake returns action to dispatch
  //action-creator is function that returns action
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

//(prevState,state) => newState
const initialState = {
  //store
  numOfCakes: 10,
};

//implementing REDUCER
//they explain how the state is changed
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

//REDUX holds application state
const store = createStore(reducer);

// const listener = () => {
//     console.log('ddddddddddd', store.getState());
//   };
//   store.subscribe(listener);

store.subscribe(() => console.log("yeahhhhh", store.getState()));

store.dispatch(buyCake());
store.dispatch(buyCake());


