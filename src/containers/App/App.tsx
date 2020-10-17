import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogOut from './logOut/logOut';
import Todolist from './TodoList/Todolist';
import About from './About/About';

class App extends React.Component<IappProps, any> {
    constructor(props: IappProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path={['/', '/home']}>
                            <Todolist />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/logout">
                            <LogOut logOut={this.props.logOut} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}
interface IappProps {
    logOut: (logOut: boolean) => void;
}
export default App;
