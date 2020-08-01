//A class that will manage the services logic

import Cookies from 'universal-cookie';
import { Icall } from '../authentication/Api/Icall';
import Http from '../authentication/Api/http';
import { TodoList } from '../../models/Imodels';
import GetTodo from './get/getTodo';
import AddTodo from './add/addTodo';

class Services {
    private call: Icall;
    private cookie: Cookies;
    private static instance: Services;

    constructor(call: Icall, cookies: Cookies) {
        this.call = call;
        this.cookie = cookies;
    }

    public static getInstance(): Services {
        if (!Services.instance) {
            const cookies: Cookies = new Cookies();
            const url: string =
                process.env.API_URL || 'http://localhost:5000/api/list';

            const call: Icall = new Http(url);
            this.instance = new Services(call, cookies);
        }
        return Services.instance;
    }

    public async getTodos(): Promise<TodoList> {
        const getTodos: GetTodo = new GetTodo(this.call, this.cookie);
        const todoList: TodoList = await getTodos.main();
        return todoList;
    }

    public async addTodo(todo: string): Promise<boolean> {
        const addTodo: AddTodo = new AddTodo(this.call, this.cookie, todo);
        const success: boolean = await addTodo.main();
        return success;
    }

    //public deleteTodo(): Promise<boolean> {}
}
export default Services;
