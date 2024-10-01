import express from "express";
export const dashboard = express.Router();

dashboard.get("/", (req, res)=>{
    if(req.session.loggedIn === true){
        res.render("home");
    }else{
        res.redirect("/login");
    }
});