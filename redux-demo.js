const redux = require("redux");
const reduxLogger = require('redux-logger')


const createStore = redux.createStore;
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


const BUY_CAKE = "BUY_CAKE";//consts for actions
const BUY_COFFEE = "BUY_COFFEE";

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

function buyCoffee() {
    return {
      type: BUY_COFFEE,
      info: "Coffee sold",
    };
  }


//(prevState,state) => newState
const cakeInitialState = {
  //store
  numOfCakes: 10,
 
};
const coffeeInitialState = {

    numOfCoffees: 30
  };

//implementing REDUCER
//they explain how the state is changed
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1.5,
      };
    default:
      return state;
  }
};


const coffeeReducer = (state = coffeeInitialState, action) => {
    switch (action.type) {
        case BUY_COFFEE:
          return {
            ...state,
            numOfCoffees: state.numOfCoffees - 1,
          };
      default:
        return state;
    }
  };


  const rootReducer = combineReducers({
    cake:cakeReducer,//state.cake.numOfCakes
    coffee:coffeeReducer
})
const store = createStore(rootReducer,applyMiddleware(logger));

// const listener = () => {
//     console.log('ddddddddddd', store.getState());
//   };
//   store.subscribe(listener);
console.log('Initial state',store.getState())
store.subscribe(() =>{});
store.dispatch(buyCake());
store.dispatch(buyCoffee());
store.dispatch(buyCake());
store.dispatch(buyCoffee());


