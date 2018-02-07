import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Authorization from './authorization';
import { checkSession } from './data/userStore';
//views
import Coach from './containers/coach';
import Login from './containers/login';
import Admin from './containers/admin';

class App extends Component {
  componentWillMount() {
    const { checkSession } = this.props;
    checkSession()
  }

  render() {
    const { authenticating } = this.props;
    return (
      <div>
      {authenticating ? 
      <div><h1>Loading...</h1></div> :
      <div className="App">
        <Switch>
          <Route path='/admin' component={Authorization(['admin'])(Admin)} />
          <Route path='/coach' component={Authorization(['coach'])(Coach)} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Login} />
        </Switch>
      </div>
      }
      </div>
    );
  }
}

const mapStateToProps = userReducer => ({
  authenticating: userReducer.authenticating,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { checkSession }, dispatch
  )
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
