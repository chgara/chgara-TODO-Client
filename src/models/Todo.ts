import { Itodo } from './Imodels';

class Todo implements Itodo {
    id: number;
    todo: string;
    created_at: Date;
    username: string;

    constructor(id: number, todo: string, created_at: Date, username: string) {
        this.id = id;
        this.todo = todo;
        this.created_at = created_at;
        this.username = username;
    }
}
export default Todo;
