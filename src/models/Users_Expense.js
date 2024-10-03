import { Database } from "./Database.js";

export class Users_Expense extends Database{
    constructor(){
        super(Users_Expense.name);
    }

    addAmount(expense_id, user_id, amount){
        this.client.query(`INSERT INTO ${this.table} (expense_id, user_id, amount) VALUES ('${expense_id}', '${user_id}', '${amount}')`);
    }

    async getAmount(user_id){
        return this.client.query(`SELECT (amount) WHERE user_id='${user_id}'`);
    }

}