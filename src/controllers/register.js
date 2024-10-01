import express from "express";
import { Users } from "../models/Users.js";
export const register = express.Router();

register.get("/", (req, res)=>{
    res.render("register");
});


register.post("/", async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let password_check = req.body.password_check;

    let users = new Users();
    let usernameCheck = await users.get(`user_name='${username}'`);
    
    if(usernameCheck.length > 0){
        res.render("register", {msg: "sorry this username has already been taken"});
    }else if(password !== password_check){
        res.render("register", {msg: "sorry Your passwords don't match up!!"});
    }else{
        users.addUser(username, password);
        res.redirect("/login");
    }
});