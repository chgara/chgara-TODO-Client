import React from 'react';
import Header from '../../../components/NavBar/Header';
import TodoForm from '../../../components/TodoList/TodoForm';
import { TodoList } from '../../../models/Imodels';
import Services from '../../../services/tasks/tasks';

class Todolist extends React.Component<ITodoListProps, ITodoListState> {
    constructor(props: ITodoListProps) {
        super(props);
        this.state = {
            loading: false,
            todos: [],
            todosNum:this.state.todos.length,   
        };
    }

    componentWillMount() {
        this.setState({ loading: true });
    }

    async componentDidMount() {
        const services: Services = Services.getInstance();

        const todoList = await services.getTodos();
        this.setState({ todos: todoList });
    }

    addTodo = async (): Promise<void> => {
        const services: Services = Services.getInstance();

        const todoList = await services.getTodos();
        this.setState({ todos: todoList });
    };

    render() {
        return (
            <>
                <Header page="home" />
                <section>
                    <article className="todolist">
                        <TodoForm addToList={this.addTodo} todosNumber={1} />
                        <main className="todolist-body"></main>
                    </article>
                </section>
            </>
        );
    }
}

interface ITodoListState {
    loading: boolean;
    todos: TodoList;
    todosNum:number;
}
interface ITodoListProps {}

export default Todolist;
