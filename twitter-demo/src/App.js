import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import './App.css';
import Navigation from './Components/Navigation'
import Login from './Components/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/app" component={Navigation}/>
      </Router>
    </div>
  );
}

export default App;




{/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React from this link
            </a>
        </header> */}