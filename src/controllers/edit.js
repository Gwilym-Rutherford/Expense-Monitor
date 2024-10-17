import express from "express"
import { Users_Expense } from "../models/Users_Expense.js";
import { Expense } from "../models/Expense.js"
export const edit = express.Router();

edit.get("/:id", async(req, res)=>{
    let id = req.params.id;

    let userExpense = new Users_Expense();
    let amount = await userExpense.getAmount(id);

    res.render("edit", {price: amount, id: id});
});

edit.post("/:id", async(req, res)=>{
    // update amount and category here, then return to dashboard
    let userExpenseId = req.params.id;
    let price = req.body.price;
    let category = req.body.category;

    

    let userExpense = new Users_Expense();

    if(price){
        userExpense.updatePrice(userExpenseId, price);
    }

    if(category){
        let expenses = new Expense();
        let expenseId = await expenses.getExpenseId(category);

        console.log("expense_id:", expenseId);

        userExpense.updateCategory(userExpenseId, expenseId);
    }

    res.redirect("/");
});