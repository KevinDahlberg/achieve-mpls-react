import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Authorization from './authorizedRoute';

//views
import Coach from './containers/coach';
import Login from './containers/login';
import Admin from './containers/admin';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/admin' component={Authorization(['admin'])(Admin)} />
          <Route path='/coach' component={Authorization(['coach'])(Coach)} />
          <Route path='/' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
