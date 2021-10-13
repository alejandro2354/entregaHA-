import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Login } from './components/Login';
import Root from './Root';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/Index">
          <Root/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>

      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
