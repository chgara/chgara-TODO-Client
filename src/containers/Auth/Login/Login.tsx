import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Elements/Button';
import Input from '../../../components/Elements/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Authentication from '../../../services/authentication/Authentication';
import { PrimitiveUser } from '../../../models/User';

//Creating a login form
class Login extends React.Component<IloginProps, IloginState> {
    constructor(props: IloginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordErr: false,
            emailErr: false,
            textErr: false,
        };
        this.loginAuth = this.loginAuth.bind(this);
        this.errors = this.errors.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.addValue = this.addValue.bind(this);
    }

    private async loginAuth(e: React.FormEvent<HTMLFormElement>) {
        if (e) e.preventDefault();
        if (!this.state.emailErr || !this.state.passwordErr) {
            return;
        }
        const user = new PrimitiveUser(this.state.email, this.state.password);
        const authentication: Authentication = Authentication.getInstance();
        const success: boolean = await authentication.login(user);
        return this.props.validation(success);
    }

    private errors(type: 'password' | 'email' | 'text', error: boolean): void {
        switch (type) {
            case 'email':
                this.setState({ emailErr: error });
                break;
            case 'password':
                this.setState({ passwordErr: error });
                break;
        }
    }

    private addValue(type: 'password' | 'email' | 'text', value: string): void {
        switch (type) {
            case 'email':
                this.setState({ email: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
        }
        return;
    }

    private disableButton(): boolean {
        if (!this.state.emailErr || !this.state.passwordErr) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <main>
                <nav className="login-nav">
                    <div className="link-box">
                        <Link to="/login">Login</Link>
                    </div>

                    <div className="link-box">
                        <Link to="/register">Register</Link>
                    </div>
                </nav>

                <form
                    action="none"
                    className="form form-auth"
                    onSubmit={this.loginAuth}
                >
                    <div className="form form-head">
                        <h1 className="form form-head-title">Login</h1>
                    </div>

                    <section className="form form-inputs">
                        <Input
                            label={
                                <>
                                    <span>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    Email
                                </>
                            }
                            name="email"
                            placeholder="Your email"
                            type="email"
                            error={this.errors}
                            addValue={this.addValue}
                        />
                        <Input
                            label={
                                <>
                                    <span>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                    Password
                                </>
                            }
                            name="password"
                            placeholder="Your password"
                            type="password"
                            error={this.errors}
                            addValue={this.addValue}
                        />
                    </section>

                    <div className="form form-submit-box">
                        <Button
                            name="submit"
                            type={'submit'}
                            disabled={this.disableButton()}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </main>
        );
    }
}

interface IloginProps {
    validation: (valid: boolean) => void;
}

interface IloginState {
    email: string;
    password: string;
    passwordErr: boolean;
    textErr: boolean;
    emailErr: boolean;
}

export default Login;
