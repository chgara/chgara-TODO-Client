import React from 'react';

//Creating a button with styles and propeties
class Button extends React.Component<IButtonProps, any> {
    constructor(props: IButtonProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <button
                onClick={this.props.do}
                type={this.props.type}
                className={`btn btn-${this.props.name}`}
                disabled={this.props.disabled}
            >
                {this.props.children}
            </button>
        );
    }
}
interface IButtonProps {
    name: string;
    type: 'button' | 'reset' | 'submit';
    do?: () => void;
    disabled?: boolean;
}
export default Button;
