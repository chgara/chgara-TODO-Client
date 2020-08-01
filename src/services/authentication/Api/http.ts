import { Icall } from './Icall';

//This class will make calls to an external api
class Http implements Icall {
    private url: string;

    constructor(url: string) {
        this.url = url;
        this.url = url;
    }

    public async post(
        url: string,
        body: object,
        token?: string,
    ): Promise<Response> {
        const headers: Headers = new Headers();

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers.append('Access-Control-Allow-Headers', 'token');

        if (token) {
            headers.append('token', token);
        }

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        };

        const Url = `${this.url}${url}`;

        const Http: Response = await fetch(Url, options);
        return Http;
    }

    public async get(url: string, token?: string): Promise<Response> {
        const headers: Headers = new Headers();

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers.append('Access-Control-Allow-Headers', 'token');

        if (token) {
            headers.append('token', token);
        }

        const options = {
            method: 'GET',
            headers: headers,
        };

        const Url = `${this.url}${url}`;

        const Http: Response = await fetch(Url, options);
        return Http;
    }

    public async put(
        url: string,
        body: object,
        token?: string,
    ): Promise<Response> {
        const headers: Headers = new Headers();

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers.append('Access-Control-Allow-Headers', 'token');

        if (token) {
            headers.append('token', token);
        }

        const options = {
            method: 'put',
            headers: headers,
            body: JSON.stringify(body),
        };

        const Url = `${this.url}${url}`;

        const Http: Response = await fetch(Url, options);
        return Http;
    }

    public async delete(
        url: string,
        body: object,
        token?: string,
    ): Promise<Response> {
        const headers: Headers = new Headers();

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers.append('Access-Control-Allow-Headers', 'token');

        if (token) {
            headers.append('token', token);
        }

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        };

        const Url = `${this.url}${url}`;

        const Http: Response = await fetch(Url, options);
        return Http;
    }
}
export default Http;
