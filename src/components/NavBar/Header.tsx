import React from 'react';
import NavBar from '../../components/NavBar/Nav';

class Header extends React.Component<IheaderProps, IheaderState> {
    render() {
        return (
            <header>
                <NavBar selected={this.props.page} />
            </header>
        );
    }
}
interface IheaderState {}
interface IheaderProps {
    page: 'home' | 'about';
}
export default Header;
