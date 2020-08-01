import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

//This class will create inputs and validate their values
class Input extends React.Component<Iinput, IinputState> {
    constructor(props: Iinput) {
        super(props);
        this.state = {
            type: this.props.type,
            value: '',
            errors: {
                password: true,
                text: true,
                email: true,
            },
        };
        this.changeTypePassword = this.changeTypePassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    private changeTypePassword() {
        if (this.state.type === 'password') {
            this.setState({ type: 'text' });
        } else {
            this.setState({ type: 'password' });
        }
    }

    private iconPassword() {
        if (this.props.type === 'password') {
            return (
                <FontAwesomeIcon
                    onClick={this.changeTypePassword}
                    className={'icon icon-password'}
                    icon={this.state.type === 'password' ? faEye : faEyeSlash}
                ></FontAwesomeIcon>
            );
        }
    }

    private handleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ value: event.target.value });

        switch ((this, this.props.type)) {
            case 'email':
                let valid: boolean = this.validMail(event.target.value);
                this.setState({ errors: { email: valid } });
                this.props.error('email', valid);
                this.props.addValue(this.props.type, event.target.value);

                if (event.target.value.length > 150) {
                    this.setState({ value: '' });
                    this.props.addValue(this.props.type, '');
                }

                break;
            case 'password':
                let length: boolean = event.target.value.length >= 4;
                this.setState({ errors: { password: length } });
                this.props.error('password', length);
                this.props.addValue(this.props.type, event.target.value);

                if (event.target.value.length > 128) {
                    this.setState({ value: '' });
                    this.props.addValue(this.props.type, '');
                }

                break;
            case 'text':
                let characters: boolean = event.target.value.length >= 4;
                this.setState({ errors: { text: characters } });
                this.props.error('text', characters);
                this.props.addValue(this.props.type, event.target.value);

                break;
        }
    }

    private validMail(mail: string): boolean {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
            mail,
        );
    }

    private errorList(type: 'email' | 'password' | 'text' | 'reset') {
        let error;

        switch (type) {
            case 'email':
                if (!this.state.errors.email) {
                    error = (
                        <li className="errors error">
                            Please enter a valid mail
                        </li>
                    );
                }
                break;
            case 'password':
                if (!this.state.errors.password) {
                    error = (
                        <li className="errors error">
                            Need to be 4-128 characters
                        </li>
                    );
                }
                break;
            case 'text':
                if (!this.state.errors.text) {
                    error = (
                        <li className="errors error">
                            Need to be 4-30 characters
                        </li>
                    );
                }
                break;
        }
        return <ul className="errors">{error}</ul>;
    }

    render() {
        const label: any | undefined = this.props.label;
        const lab = <label className="input-group input-label">{label}</label>;

        return (
            <>
                <div className="input-group">
                    {label ? lab : <></>}
                    <input
                        type={this.state.type}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        className={`input input-${this.props.name}`}
                        onChange={this.handleChange}
                    />
                    {this.errorList(this.props.type)}
                    {this.iconPassword()}
                </div>
            </>
        );
    }
}
interface Iinput {
    name: string;
    type: 'email' | 'password' | 'text';
    label?: any;
    placeholder: string;
    error: (type: 'password' | 'email' | 'text', error: boolean) => void;
    addValue: (type: 'password' | 'email' | 'text', value: string) => void;
}
interface IinputState {
    type: 'email' | 'password' | 'text';
    value: string;
    errors: Ierror;
}
interface Ierror {
    password?: boolean;
    email?: boolean;
    text?: boolean;
}
export default Input;
