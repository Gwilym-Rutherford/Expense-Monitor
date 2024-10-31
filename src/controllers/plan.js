import express from 'express';
export const plan = express.Router();

plan.get("/", (req, res)=>{
    res.render("plan");
});
