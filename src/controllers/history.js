import express from "express";
export const history = express.Router();

history.get("/", (req, res)=>{
    res.render("history");
});