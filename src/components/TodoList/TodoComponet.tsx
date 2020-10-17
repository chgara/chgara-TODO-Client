import React from 'react';
import { Itodo } from '../../models/Imodels';

class TodoComponet extends React.Component<
    ITodoComponentProps,
    ITodoComponetState
> {
    constructor(props: ITodoComponentProps) {
        super(props);
	this.state = { value: this.props.todo };
    }

    render() {
        return (
            <div key={this.state.value.id} className="todolist-body-todo">
                <div className="todolist-body-todo-value">
                    <p>{this.state.value.todo}</p>
                </div>
                <div className="todolist-body-todo-date">
                    <p>{this.state.value.created_at}</p>
                </div>
            </div>
        );
    }
}
export default TodoComponet;

interface ITodoComponentProps {
    todo: Itodo;
}
interface ITodoComponetState {
    value: Itodo;
}
