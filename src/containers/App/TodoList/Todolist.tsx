import React from 'react';
import Header from '../../../components/NavBar/Header';
import TodoForm from '../../../components/TodoList/TodoForm';
import { TodoList } from '../../../models/Imodels';
import Services from '../../../services/tasks/tasks';
import TodoComponent from '../../../components/TodoList/TodoComponet';

class Todolist extends React.Component<ITodoListProps, ITodoListState> {
    constructor(props: ITodoListProps) {
        super(props);
        this.state = {
            loading: false,
            todos: [],
            todosNum: 0,
        };
    }

    componentWillMount() {
        this.setState({ loading: true });
    }

    async componentDidMount() {
        const services: Services = Services.getInstance();

        const todoList = await services.getTodos();
        this.setState({ todos: todoList });
        this.setState({ todosNum: todoList.length });

        this.setState({ loading: false });
        console.log(todoList);
    }

    addTodo = async (): Promise<void> => {
        console.log('adding');
        //await setTimeout(async () => {
        await this.componentDidMount();
        //}, 1000);
    };

    render() {
        let todos: JSX.Element[] = this.state.todos.map((todo) => {
            return <TodoComponent key={todo.id} todo={todo} />;
        });

        return (
            <>
                <Header page="home" />
                <section>
                    <article className="todolist">
                        <TodoForm
                            addToList={this.addTodo}
                            todosNumber={this.state.todosNum}
                        />
                        <main className="todolist-body">{todos}</main>
                    </article>
                </section>
            </>
        );
    }
}

interface ITodoListState {
    loading: boolean;
    todos: TodoList;
    todosNum: number;
}
interface ITodoListProps {}

export default Todolist;
