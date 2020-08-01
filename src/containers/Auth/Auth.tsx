import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Lottie from 'react-lottie';
import successAnimation from '../../animations/successAnimation.json';
import errorAnimation from '../../animations/failAnimation.json';
import Login from './Login/Login';
import Register from './Register/Register';

//This will be the main authentication component
class Auth extends React.Component<IauthProps, IauthState> {
    constructor(props: IauthProps) {
        super(props);
        this.state = {
            error: false,
            success: false,
        };
        this.validation = this.validation.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    private validation(valid: boolean): void {
        if (valid) {
            this.setState({ success: true });
            setTimeout(() => {
                this.props.logIn(true);
            }, 3000);
        } else {
            this.setState({ error: true });
        }
    }

    private animations(): JSX.Element | void {
        let animation: object;
        let Animation: JSX.Element;
        const num: number = 250;

        if (this.state.success) {
            animation = successAnimation;
            const options = {
                loop: false,
                autoplay: true,
                animationData: animation,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                },
            };
            Animation = (
                <div className="animations animation-success">
                    <Lottie options={options} height={num} width={num} />
                </div>
            );
            return Animation;
        } else if (this.state.error) {
            animation = errorAnimation;
            const options = {
                loop: false,
                autoplay: true,
                animationData: animation,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                },
            };
            Animation = (
                <div
                    className="animations animation-fail"
                    onClick={this.handleClick}
                >
                    <Lottie options={options} height={num} width={num} />
                </div>
            );
            return Animation;
        }
    }

    private handleClick() {
        this.setState({ success: false, error: false });
    }

    render() {
        return (
            <div className="Auth">
                <Router>
                    <Switch>
                        <Route path="/login">
                            <Login validation={this.validation} />
                        </Route>
                        <Route path="/register">
                            <Register validation={this.validation} />
                        </Route>
                    </Switch>
                    {this.animations()}
                </Router>
            </div>
        );
    }
}
interface IauthProps {
    logIn: (login: boolean) => void;
}
interface IauthState {
    error: boolean;
    success: boolean;
}
export default Auth;
