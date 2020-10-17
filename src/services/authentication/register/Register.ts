import User from '../../../models/User';
import { Imessage } from '../Iauth';
import { Icall } from '../Api/Icall';
import Cookies from 'universal-cookie';

//A class that handle the login logic
class Register {
    private http: Icall;
    private cookie: Cookies;

    constructor(http: Icall, cookie: Cookies) {
        this.http = http;
        this.cookie = cookie;
    }

    async main(user: User): Promise<boolean> {
        const body: object = {
            email: user.getEmail(),
            password: user.getPassword(),
            username: user.getUserName(),
        };
        if (!this.full(user)) {
            return false;
        }
        try {
            const response = await this.http.post('/register', body);
            const auth: boolean = await this.auth(response);

            if (!auth) {
                return false;
            }

            const headers: Headers = response.headers;

            for (var pair of headers.entries()) {
                if (pair[0] === 'token') {
                    const token = pair[1];
                    console.log(token);
                    this.cookie.set('token', token, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7,
                    });
                }
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    private full(user: User): boolean {
        if (!user.getEmail() || !user.getPassword() || !user.getUserName()) {
            return false;
        }
        return true;
    }

    private async auth(response: Response): Promise<boolean> {
        if (response.status !== 201) {
            return false;
        }
        const message: Imessage = await response.json();
        console.log(message);

        if (message.error || !message.success) {
            return false;
        }
        return true;
    }
}
export default Register;
