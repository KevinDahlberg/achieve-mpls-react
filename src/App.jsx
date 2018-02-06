import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//views
import Login from './containers/login';
import Home from './containers/home';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
