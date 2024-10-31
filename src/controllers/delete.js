import express from "express"
import { Users_Expense } from "../models/Users_Expense.js";
export const deleteExpense = express.Router();

deleteExpense.get("/:id", async(req, res)=>{
    let userExpenseId = req.params.id;

    let userExpense = new Users_Expense();
    await userExpense.deleteExpense(userExpenseId)

    res.redirect("/");
});