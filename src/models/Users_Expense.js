import { Database } from "./Database.js";

export class Users_Expense extends Database{
    constructor(){
        super(Users_Expense.name);
    }

    addAmount(expense_id, user_id, amount){
        this.client.query(`INSERT INTO ${this.table} (expense_id, user_id, amount) VALUES ('${expense_id}', '${user_id}', '${amount}')`);
    }

    async getAmount(user_id){
        return await this.client.query(`SELECT (amount) WHERE user_id='${user_id}'`);
    }

    async getExpenseAmount(user_id, month){
        return await this.client.query(`SELECT users_expense.*, expense.expense, 
                                        EXTRACT(MONTH FROM users_expense.entry_date) AS "month"
                                        FROM users_expense
                                        JOIN expense ON users_expense.expense_id = expense.expense_id
                                        WHERE EXTRACT(MONTH FROM users_expense.entry_date) = ${month} AND users_expense.user_id=${user_id};`);
    }

}