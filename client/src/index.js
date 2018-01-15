import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import root from './reducers';
import { init, emit } from './actions/sockets';
import App from './App';


const store = createStore(root);

init(store);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
)