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
    let expense_value = (req.body.expense).toUpperCase();
    let expenses = new Expense();
    let currentExpenses = await expenses.get(`user_id='${req.session.user_id}' AND expense='${expense_value}'`);

    let amount = new Amount();
    let amount_value = req.body.expense;

    if(expense_value != "" && amount_value != ""){
        if(currentExpenses.length > 0){
            let expense_id = expenses.getExpenseID(expense_value);
            amount.addAmount(expense_id, req.session.user_id, amount_value);
        }else{
            let expenseReturnValue = await expenses.addExpense(req.session.user_id, expense_value);
            amount.addAmount(expenseReturnValue.expense_id, req.session.user_id, amount_value);
        }
    }
});