import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import App from './containers/App/App';
import Authentication from './services/authentication/Authentication';

class Main extends React.Component<ImainProps, ImainState> {
    constructor(props: ImainProps) {
        super(props);
        this.state = {
            authed: false,
        };
        this.login = this.login.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    logOut(logOut: boolean) {
        if (logOut) {
            this.login(false);
            return;
        } else {
            return;
        }
    }

    login(login: boolean) {
        if (login) {
            this.setState({ authed: true });
            return;
        } else {
            this.setState({ authed: false });
            return;
        }
    }

    componentDidMount() {
        const authentication: Authentication = Authentication.getInstance();
        const auth: boolean = authentication.authed();
        this.setState({ authed: auth });
    }

    private loginPath(): JSX.Element {
        if (this.state.authed) return <Redirect push to="/" />;
        else return <Auth logIn={this.login} />;
    }

    private appPath(): JSX.Element {
        if (this.state.authed) return <App logOut={this.logOut} />;
        else return <Redirect push to="/login" />;
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/(login|register)/">{this.loginPath()}</Route>
                    <Route path={['/', '/(about|add)']}>{this.appPath()}</Route>
                </Switch>
            </Router>
        );
    }
}
interface ImainState {
    authed: boolean;
}
interface ImainProps {}

export default Main;
