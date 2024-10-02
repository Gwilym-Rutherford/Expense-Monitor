import express from "express";
import { Expense } from "../models/Expense.js";
import { Amount } from "../models/Amount.js";
export const dashboard = express.Router();

dashboard.get("/", async (req, res)=>{
    if(req.session.loggedIn === true){
        res.render("dashboard", {expenseMsg: ""});
    }else{
        res.redirect("/login");
    }
});

dashboard.post("/", async (req, res)=>{
    let user_id = req.session.user_id;

    let expense_value = (req.body.expense).toUpperCase();
    let expenses = new Expense();
    let currentExpenses = await expenses.get(`user_id='${user_id}' AND expense='${expense_value}'`);

    let amount_value = req.body.amount;
    let amount = new Amount();

    if(!(currentExpenses.length > 0)){
        await expenses.addExpense(user_id, expense_value);
        if(!amount_value){
            res.redirect("/");
        }
    }else if(!amount_value){
        res.render("dashboard", {expenseMsg: "This expense has already been added"});
    }
    
    if(amount_value){
        let expense_id = await expenses.getExpenseId(expense_value);
        amount.addAmount(expense_id, user_id, amount_value);
        res.redirect("/");
    }
});