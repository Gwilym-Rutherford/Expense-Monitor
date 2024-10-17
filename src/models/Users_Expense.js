import { Database } from "./Database.js";

export class Users_Expense extends Database{
    constructor(){
        super(Users_Expense.name);
    }

    addAmount(expense_id, user_id, amount){
        this.client.query(`INSERT INTO ${this.table} (expense_id, user_id, amount) VALUES ('${expense_id}', '${user_id}', '${amount}')`);
    }

    async getAmount(amount_id){
        return (await (this.client.query(`SELECT amount FROM ${this.table} WHERE amount_id='${amount_id}'`))).rows[0].amount;
    }

    async getCategory(amount_id){
        return (await (this.client.query(`SELECT category FROM ${this.table} WHERE amount_id='${amount_id}'`))).rows[0].amount;
    }

    async getExpenseAmount(user_id, month){
        return await this.client.query(`SELECT users_expense.*, expense.expense, 
                                        EXTRACT(MONTH FROM users_expense.entry_date) AS "month"
                                        FROM users_expense
                                        JOIN expense ON users_expense.expense_id = expense.expense_id
                                        WHERE EXTRACT(MONTH FROM users_expense.entry_date) = ${month} AND users_expense.user_id=${user_id}
                                        ORDER BY amount_id;`);
    }

    async updateCategory(amount_id, updateValue){
        await this.client.query(`UPDATE ${this.table} SET expense_id='${updateValue}' WHERE amount_id='${amount_id}';`);
        //update users_expense set amount=10 where amount_id=1;
    }

    async updatePrice(amount_id, updateValue){
        await this.client.query(`UPDATE ${this.table} SET amount='${updateValue}' WHERE amount_id='${amount_id}';`);
    }


}