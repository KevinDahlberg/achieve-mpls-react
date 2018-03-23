import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Authorization from './authorization';
import { checkSession } from './store';
//views
import Coach from './Authenticated/Coach';
import ForgotPassword from './Login/ForgotPassword';
import NewPassword from './Login/NewPassword';
import Login from './Login/login';
import Admin from './Authenticated/Admin';

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
            // add if statement to say if there is a session present, push to authenticated.
        })
    }

    render() {
        const { authenticating } = this.state;
        console.log(authenticating);
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
