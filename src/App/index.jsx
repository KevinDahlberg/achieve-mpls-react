import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Authorization from './authorization';
import { checkSession } from './data/authStore';
//views
import Coach from './authenticated/coach';
import ForgotPassword from './login/ForgotPassword';
import NewPassword from './login/NewPassword';
import Login from './login/login';
import Admin from './authenticated/admin';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticating: true
        }
    }

    componentWillMount() {
        const { checkSession } = this.props;
        checkSession()
        .then((res) => {
            this.setState({ authenticating: false })
        })
    }

    render() {
        const { authenticating } = this.state;
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { checkSession }, dispatch
  )
}
export default withRouter(connect(null, mapDispatchToProps)(App));
