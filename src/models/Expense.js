import { Database } from "./Database.js";

export class Expense extends Database{
    constructor(){
        super(Expense.name);
    }

    addExpense(user_id, expense){
        this.client.query(`INSERT INTO ${this.table} (user_id, expense) VALUES ('${user_id}', '${expense}')`);
    }
}