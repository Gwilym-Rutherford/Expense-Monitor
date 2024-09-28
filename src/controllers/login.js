import express from 'express';
export const login = express.Router();

login.get("/", (req, res)=>{
    res.render("login");
});

login.post("/", (req, res)=>{
    let username = (req.body.username).toLowerCase();
    let password = req.body.password;

    if(password == "password"){
        req.session.loggedIn = true;
        res.redirect("/");
    }
})