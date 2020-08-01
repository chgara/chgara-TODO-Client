import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Elements/Button';
import Input from '../../../components/Elements/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import User from '../../../models/User';
import Authentication from '../../../services/authentication/Authentication';

//Creating a login form
class Register extends React.Component<IregisterProps, IregisterState> {
    constructor(props: IregisterProps) {
        super(props);
        this.state = {
            errors: false,
            email: '',
            password: '',
            userName: '',
            passwordErr: false,
            emailErr: false,
            textErr: false,
        };
        this.registerAuth = this.registerAuth.bind(this);
        this.errors = this.errors.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.addValue = this.addValue.bind(this);
        this.noErrors = this.noErrors.bind(this);
    }

    private async registerAuth(e: React.FormEvent<HTMLFormElement>) {
        if (e) e.preventDefault();
        if (!this.noErrors()) {
            return;
        }

        const user: User = new User(
            this.state.email,
            this.state.userName,
            this.state.password,
        );
        const authentication: Authentication = Authentication.getInstance();
        const success: boolean = await authentication.register(user);
        return this.props.validation(success);
    }

    private noErrors(): boolean {
        if (
            !this.state.emailErr ||
            !this.state.passwordErr ||
            !this.state.textErr ||
            this.state.userName.length >= 30
        ) {
            return false;
        }
        return true;
    }

    private errors(type: 'password' | 'email' | 'text', error: boolean): void {
        switch (type) {
            case 'email':
                this.setState({ emailErr: error });
                break;
            case 'password':
                this.setState({ passwordErr: error });
                break;
            case 'text':
                this.setState({ textErr: error });
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
            case 'text':
                this.setState({ userName: value });
        }
        return;
    }

    private disableButton(): boolean {
        if (
            !this.state.emailErr ||
            !this.state.passwordErr ||
            !this.state.textErr
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <main>
                <nav className="register-nav">
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
                    onSubmit={this.registerAuth}
                >
                    <div className="form form-head">
                        <h1 className="form form-head-title">Login</h1>
                    </div>

                    <section className="form form-inputs">
                        <Input
                            label={
                                <>
                                    <span>
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    Username
                                </>
                            }
                            name="userName"
                            placeholder="Your Username"
                            type="text"
                            error={this.errors}
                            addValue={this.addValue}
                        />
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

interface IregisterProps {
    validation: (valid: boolean) => void;
}

interface IregisterState {
    email: string;
    password: string;
    userName: string;
    passwordErr: boolean;
    textErr: boolean;
    emailErr: boolean;
    errors: boolean;
}

export default Register;
