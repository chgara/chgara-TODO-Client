import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

class NavBar extends React.Component<InavBarProps, InavBarState> {
    constructor(props: InavBarProps) {
        super(props);

        this.homeSelected = this.homeSelected.bind(this);
        this.aboutSelected = this.aboutSelected.bind(this);
    }

    homeSelected(): string | void {
        if (this.props.selected === 'home') {
            return 'selected';
        }
        return '';
    }

    aboutSelected(): string | void {
        if (this.props.selected === 'about') {
            return 'selected';
        }
        return '';
    }

    render() {
        return (
            <nav className="navbar">
                <div className="navbar-icon">
                    <img src={logo} alt="React logo" />
                </div>
                <div className="navbar-title">
                    <Link
                        target="_self"
                        to="/home"
                        className="navbar-title-txt"
                    >
                        TodoList
                    </Link>
                </div>
                <input
                    type="checkbox"
                    id="nav-btn"
                    className="navbar-burger checkbox"
                />
                <ul className="navbar-list">
                    <li className={`navbar-list-li ${this.homeSelected()}`}>
                        <Link target="_self" to="/home">
                            Home
                        </Link>
                    </li>
                    <li className={`navbar-list-li ${this.aboutSelected()}`}>
                        <Link target="_self" to="/about">
                            About
                        </Link>
                    </li>
                    <li className={`navbar-list-li`}>
                        <Link target="_self" to="/logout">
                            LogOut
                        </Link>
                    </li>
                </ul>

                <label htmlFor="nav-btn" className="navbar-burger">
                    <span className="nabvar-burger burger 1"></span>
                    <span className="nabvar-burger burger 2"></span>
                    <span className="nabvar-burger burger 3"></span>
                </label>
            </nav>
        );
    }
}
interface InavBarState {}
interface InavBarProps {
    selected: 'about' | 'home';
}
export default NavBar;
