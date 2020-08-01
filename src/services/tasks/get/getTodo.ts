import { TodoList } from '../../../models/Imodels';
import { Icall } from '../../authentication/Api/Icall';
import Cookies from 'universal-cookie';

class GetTodo {
    private http: Icall;
    private cookie: Cookies;

    constructor(http: Icall, cookie: Cookies) {
        this.http = http;
        this.cookie = cookie;
    }

    async main(): Promise<TodoList> {
        const token: string = this.cookie.get('token');
        try {
            const response = await this.http.get('', token);
            const todoList: TodoList = await response.json();
            return todoList;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
export default GetTodo;
