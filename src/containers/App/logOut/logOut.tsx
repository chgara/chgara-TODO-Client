import React from 'react';
import Authentication from '../../../services/authentication/Authentication';

class LogOut extends React.Component<IlogOutProps, any> {
    private logOut() {
        const authentication: Authentication = Authentication.getInstance();
        const logedOut: boolean = authentication.logOut();
        this.props.logOut(logedOut);
    }

    render() {
        this.logOut();
        return <h1>err0r</h1>;
    }
}
interface IlogOutProps {
    logOut: (logOut: boolean) => void;
}
export default LogOut;
