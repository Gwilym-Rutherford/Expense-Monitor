import express from 'express';
import { Users } from '../models/Users.js';
export const login = express.Router();

login.get("/", (req, res)=>{
    res.render("login");
});

login.post("/", async(req, res)=>{
    let username = (req.body.username).toLowerCase();
    let password = req.body.password;

    let user = new Users();
    let user_info = (await user.get(`user_name='${username}'`))[0];

    if(typeof user_info != 'undefined' && user_info.password == password){
        req.session.loggedIn = true;
        req.session.user_id = user_info.user_id;
        res.redirect("/");
    }else{
        res.render("login", {msg: "username or password is incorrect!!"});
    }
})