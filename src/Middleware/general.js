import { Expense } from "../models/Expense.js";

export async function checkExpenses(user_id, expense){
    let expenses = new Expense();
    let currentExpenses = await expenses.get(`user_id='${user_id}' AND expense='${expense}'`);
    if(currentExpenses.length > 0){
        return true;
    }
    return false;
}

export function checkDropDown(value){
    if(typeof value == "undefined"){
        return false;
    }
    return true;
}