import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './styles.scss';
import { bindActionCreators } from 'redux';

// state
const initialState = {
  count: 0,
};

// action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// acrion creator
const increment = () => ({
  type: INCREMENT,
});

const decrement = () => ({
  type: DECREMENT,
});

// our reducer
const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      count: state.count + 1,
    };
  } else if (action.type === DECREMENT) {
    return {
      count: state.count - 1,
    };
  }
  return state;
};

const store = createStore(reducer);

// we are using redux for all of our state management which means we are not going to be using react state
// That means everything that comes into this counter will come in as a prop
// This includes the current count and the ability to dispatch the action
class Counter extends Component {
  render() {
    const { count, increment, decrement } = this.props;
    console.log({ count, increment, decrement });
    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button>Reset</button>
        </section>
      </main>
    );
  }
}

// no every component is going to care about every piece of the state tree
//
const mapStateToProps = (state) => {
  return state;
};
// dispatch effectively points to store.dispatch()
// gives you the ability to modify the state with actions
// when put into connect it takes the action creators, automatically combines them is the stores dispatch method
const mapDispatchToProps = {
  increment,
  decrement,
};
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       increment,
//       decrement,
//     },
//     dispatch,
//   );
//   // return {
//   //   increment() {
//   //     dispatch(incrementValue());
//   //   },
//   //   decrement() {
//   //     dispatch(decrementValue());
//   //   },
//   // };
// };

// connect returns a function that waits for a react component
// connect is an implmentation of the container/presentational component pattern
// it takes state and props, makes them a prop and passes them to na high order component it makes for us
const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);
// We can now hook up any component in this tree to our redux store
render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
