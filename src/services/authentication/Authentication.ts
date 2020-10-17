import User, { PrimitiveUser } from '../../models/User';
import Login from './login/Login';
import { Icall } from './Api/Icall';
import Cookies from 'universal-cookie';
import Http from './Api/http';
import Register from './register/Register';

//This class will handle the auth and verification logic
class Authentication {
    private call: Icall;
    private cookie: Cookies;
    private static instance: Authentication;

    constructor(call: Icall, cookies: Cookies) {
        this.call = call;
        this.cookie = cookies;
    }

    public static getInstance(): Authentication {
        if (!Authentication.instance) {
            const cookies: Cookies = new Cookies();
            const url: string = process.env.REACT_APP_API_URL
                ? `${process.env.REACT_APP_API_URL}/api/auth`
                : 'http://localhost:5000/api/auth';

            const call: Icall = new Http(url);
            this.instance = new Authentication(call, cookies);
        }
        return Authentication.instance;
    }

    async login(user: PrimitiveUser): Promise<boolean> {
        const login: Login = new Login(this.call, this.cookie);
        const authed: boolean = await login.main(user);
        return authed;
    }

    async register(user: User): Promise<boolean> {
        const register: Register = new Register(this.call, this.cookie);
        const authed: boolean = await register.main(user);
        return authed;
    }
    authed(): boolean {
        const token: string | undefined = this.cookie.get('token');

        if (!token) return false;
        if (token.length < 10) return false;

        return true;
    }

    logOut(): boolean {
        try {
            this.cookie.remove('token');
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
export default Authentication;
