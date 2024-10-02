import express from "express";
import { Expense } from "../models/Expense.js";
export const contentApi = express.Router();

contentApi.get("/expenses", async (req, res)=>{
    let amount = req.query.amount
    let user_id = req.session.user_id;
    let expense = new Expense();
    
    if(amount){
        res.send("amount");
    }else{
        res.send((await expense.getExpense(user_id)).rows);
    }
});
