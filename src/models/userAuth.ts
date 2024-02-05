export class UserAuth {
    username: string;
    password: string;
    keepSession: boolean;

    constructor(username: string, password: string, keepSession: boolean) {
        this.username = username;
        this.password = password;
        this.keepSession = keepSession;
    }
}