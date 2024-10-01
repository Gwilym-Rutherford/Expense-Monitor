import { Database } from "./Database.js";

export class Expense extends Database{
    constructor(){
        super(Expense.name);
    }

    async addExpense(user_id, expense){
        return this.client.query(`INSERT INTO ${this.table} (user_id, expense) VALUES ('${user_id}', '${expense}')`);
    }

    async getExpense(user_id){
        return this.client.query(`SELECT 'expense' WHERE user_id='${user_id}'`);
    }

    async getExpenseID(expense){
        return this.client.query(`SELECT 'expense_id' WHERE expense='${expense}'`);
    }
}