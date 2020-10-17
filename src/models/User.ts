//This class will instance user objects

export class PrimitiveUser {
    protected email: string;
    protected password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }
    public getPassword(): string {
        return this.password;
    }
}
export class User extends PrimitiveUser {
    protected userName: string;

    constructor(email: string, userName: string, password: string) {
        super(email, password);
        this.userName = userName;
    }

    public getUserName(): string {
        return this.userName;
    }
}

export class AuthedUser extends User {
    protected token: string;

    constructor(
        email: string,
        userName: string,
        password: string,
        token: string,
    ) {
        super(email, userName, password);
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }
}

export default User;
