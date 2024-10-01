import { Database } from "./Database.js";

export class Users extends Database{
    constructor(){
        super(Users.name);
    }

    addUser(username, password){
        this.client.query(`INSERT INTO ${this.table} (user_name, password) VALUES ('${username}', '${password}')`);
    }
}