import express from "express";
import { Users_Expense } from "../models/Users_Expense.js";
import { Expense } from "../models/Expense.js";
export const contentApi = express.Router();

contentApi.get("/expenses", async (req, res)=>{
    let amount = req.query.amount;
    let month = req.query.month;
    let user_id = req.session.user_id;
    let userExpense = new Users_Expense();
    let expense = new Expense();

    if(!month){
        month = (new Date).getMonth() + 1;
    }
    
    if(amount){
        res.send((await userExpense.getExpenseAmount(user_id, month)).rows);
    }else{
        res.send((await expense.getExpense(user_id)).rows)
    }
});
