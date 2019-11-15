import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


//COMPONENTS
import Login from './components/Login';
import JokeList from './components/JokeList';

function App() {
  return (
    <Router>
    <div className="App">
        <nav>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/users'>Jokes</Link></li>
        </nav>
      <section>
        <h2>Let's Have a Pun Ol' Time!</h2>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/users' component={JokeList}/>
        </Switch>
      </section>
      <footer>
        <img src='http://hddfhm.com/images/clipart-island-20.png'/>
      </footer>
    </div>
    </Router>
  );
}

export default App;