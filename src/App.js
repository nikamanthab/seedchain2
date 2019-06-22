import React from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './js/container/home';
import Login from './js/container/login';
import {Router} from '@reach/router';
import ItemCard from './js/component/itemcard';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/home"/>
        <Login path="/"/>
      </Router>
    </div>
  );
}

export default App;
