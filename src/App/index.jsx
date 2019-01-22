import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Authorization from './containers/Auth';
import { checkLogin } from './containers/Auth/store/operations';
//views
import Coach from './containers/Authenticated/Coach';
import ForgotPassword from './containers/Auth/ForgotPassword';
import CreatePassword from './containers/Auth/CreatePassword';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Admin from './containers/Authenticated/Admin';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticating: true
        }
    }

    componentWillMount() {
        const { checkLogin } = this.props;
        checkLogin()
        .then((res) => {
            if (res.role === 'admin') {
                this.props.history.push('/admin');
            }
            if (res.role === 'coach') {
                this.props.history.push('/coach');
            }
            this.setState({ authenticating: false })
        })
        .catch(() => {
            this.setState({ authenticating: false});
        });
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
                            <Route path='/create-password/:id' component={CreatePassword} />
                            <Route path='/forgot-password' component={ForgotPassword} />
                            <Route path='/register' component={Signup} />
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
    { checkLogin }, dispatch
  )
}
export default withRouter(connect(null, mapDispatchToProps)(App));
