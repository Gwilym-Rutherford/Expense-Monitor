import express from "express";
import { Expense } from "../models/Expense.js";
export const dashboard = express.Router();

dashboard.get("/", (req, res)=>{
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

    if(currentExpenses.length > 0){
        res.render("dashboard", {expenseMsg: "Sorry this expense already exists"});
    }else{
        expenses.addExpense(req.session.user_id, expense_value);
        res.redirect("/");
    }
});