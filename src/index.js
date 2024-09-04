import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './styles/index.css'
import './styles/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saga, store } from './State_And_Store/store/InvestigationState';
import { Provider } from 'react-redux';
import rootSaga from './State_And_Store/saga/RootSaga';
saga.run(rootSaga )

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
     </Provider>
  </React.StrictMode>
);
