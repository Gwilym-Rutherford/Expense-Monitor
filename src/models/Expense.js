import { Database } from "./Database.js";

export class Expense extends Database{
    constructor(){
        super(Expense.name);
    }

    async addExpense(user_id, expense){
        return await this.client.query(`INSERT INTO ${this.table} (user_id, expense) VALUES ('${user_id}', '${expense}')`);
    }

    async getExpense(user_id){
        return await this.client.query(`SELECT (expense) FROM ${this.table} WHERE user_id='${user_id}'`);
    }

    async getExpenseId(expense){
        return (await this.client.query(`SELECT (expense_id) FROM ${this.table} WHERE expense='${expense}'`)).rows[0].expense_id;
    }
}