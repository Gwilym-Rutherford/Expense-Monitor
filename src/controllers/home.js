import express from "express";
export const home = express.Router();

home.get("/", (req, res)=>{
    if(req.session.loggedIn === true){
        res.render("home");
    }else{
        res.redirect("/login");
    }
});