import express from "express";
import { Expense } from "../models/Expense.js";
import { Users_Expense } from "../models/Users_Expense.js";
import { checkExpenses, checkDropDown } from "../Middleware/general.js";
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
    
    let expenseDropDownValue = req.body.dropDown;
    let dropDownExists = checkDropDown(expenseDropDownValue);

    let expenses = new Expense();
    let expenseValue = (req.body.expense)
    if(typeof expenseValue != "undefined"){
        expenseValue.toUpperCase();
    }
    let expenseExists = await checkExpenses(user_id, expenseValue);

    let amountValue = req.body.amount;
    let usersExpense = new Users_Expense();

    if(dropDownExists){
        if(amountValue){
            let expense_id = await expenses.getExpenseId(expenseDropDownValue);
            usersExpense.addAmount(expense_id, user_id, amountValue);
            res.redirect("/");
        }else{
            res.render("dashboard", {expenseMsg: "Please add an amount"});
        }
    }else if(expenseValue){
        if(amountValue != "" && expenseExists){
            let expense_id = await expenses.getExpenseId(expenseValue);
            usersExpense.addAmount(expense_id, user_id, amountValue);
            res.redirect("/");
        }else if(amountValue != ""){
            await expenses.addExpense(user_id, expenseValue);
            let expense_id = await expenses.getExpenseId(expenseValue);
            usersExpense.addAmount(expense_id, user_id, amountValue);
            res.redirect("/");
        }else if(expenseExists){
            res.render("dashboard", {expenseMsg: "This expense has already been added, please check the drop down menu."});
            
        }else{
            await expenses.addExpense(user_id, expenseValue);
            res.redirect("/");
        }
    }
});