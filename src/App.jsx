import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Authorization from './authorization';
import { checkSession } from './data/authStore';
//views
import Coach from './containers/coach';
import ForgotPassword from './containers/ForgotPassword';
import NewPassword from './containers/NewPassword';
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
          <Route path='/new-password' component={NewPassword} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Login} />
        </Switch>
      </div>
      }
      </div>
    );
  }
}

const mapStateToProps = authReducer => ({
  authenticating: authReducer.authenticating,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { checkSession }, dispatch
  )
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
