import { Icall } from '../../authentication/Api/Icall';
import Cookies from 'universal-cookie';
import { Imessage } from '../../authentication/Iauth';

class AddTodo {
    private http: Icall;
    private cookie: Cookies;
    private todo: string;

    constructor(call: Icall, cookie: Cookies, todo: string) {
        this.cookie = cookie;
        this.http = call;
        this.todo = todo;
    }

    public async main(): Promise<boolean> {
        const token: string = this.cookie.get('token');
        try {
            const response = await this.http.post(
                '',
                { todo: this.todo },
                token,
            );
            const success = this.auth(response);
            return success;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    private async auth(response: Response): Promise<boolean> {
        if (response.status !== 200) {
            return false;
        }
        const message: Imessage = await response.json();

        if (message.error || !message.success) {
            return false;
        }
        return true;
    }
}

export default AddTodo;
