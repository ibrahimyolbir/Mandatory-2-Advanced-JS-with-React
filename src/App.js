import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Home from './components/home';
import AddMovie from './components/addmovie';
import EditMovie from './components/editmovie';
import DetailsPage from './components/detailspage';
import './App.css';
const App = () => (
  
  <Router>
      <div>
        <header>
        <h1><i className="far fa-star"></i> MOVIE DB</h1>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/addmovie"> Add Movie </Link>
          </li>
        </ul>
        </header>
        <Route exact path="/" component={Home} />
        <Route path="/addmovie" component={AddMovie} />
        <Route path="/editmovie/:id" component={EditMovie} />
        <Route path="/detailspage/:id" component={DetailsPage} />
      </div>
    
  </Router>
);

export default App;
