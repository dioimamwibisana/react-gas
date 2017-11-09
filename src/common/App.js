import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Header from './components/Header';

import '../assets/styles/styles.scss'

class App extends Component{
  render(){
    return(
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path='*' component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

export default App;
