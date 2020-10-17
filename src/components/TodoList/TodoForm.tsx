import React from 'react';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import Services from '../../services/tasks/tasks';

class TodoForm extends React.Component<ITodoformProps, ITodoformState> {
    constructor(props: ITodoformProps) {
        super(props);
        this.state = {
            error: true,
            value: '',
        };
    }

    handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();
        if (this.state.error || this.state.value === '') {
            return;
        }
        const services: Services = Services.getInstance();
        const success = await services.addTodo(this.state.value);
        if (!success) {
            return;
        }
        await this.props.addToList();
        this.addValue('text', '');
    };

    error = (type: 'password' | 'email' | 'text', error: boolean): void => {
        if (type === 'text') {
            this.setState({ error: !error });
        }
        return;
    };

    addValue = (type: 'password' | 'email' | 'text', value: string): void => {
        if (type === 'text') {
            this.setState({ value: value });
        }
        return;
    };

    render() {
        return (
            <header className="todolist-header">
                <div className="todolist-header-title">
                    <h2 className="todolist-header-title-h2">Todos</h2>
                    <div className="todolist-header-title-number">
                        <p>{this.props.todosNumber}</p>
                    </div>
                </div>
                <form
                    onSubmit={this.handleSubmit}
                    className="todolist-header-form"
                >
                    <label
                        htmlFor="todoForm"
                        className="todolist-header-form-label hidden"
                    >
                        Add todo
                    </label>
                    <Input
                        name="todoForm"
                        placeholder="Your Todo"
                        type="text"
                        error={this.error}
                        addValue={this.addValue}
                    />
                    <Button
                        name="add"
                        type="submit"
                        disabled={this.state.error}
                        children={<p>+</p>}
                    />
                </form>
            </header>
        );
    }
}
interface ITodoformProps {
    todosNumber: number;
    addToList: () => Promise<void>;
}
interface ITodoformState {
    error: boolean;
    value: string;
}
export default TodoForm;
