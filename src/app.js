import express from "express";
import path from "path";
import Session from "express-session";
import * as crypto from "crypto";

import { dashboard } from "./controllers/dashboard.js";
import { login } from "./controllers/login.js";
import { register } from "./controllers/register.js";
import { contentApi } from "./controllers/contentApi.js";
import { history } from "./controllers/history.js";

const __dirname = import.meta.dirname;
const app = express();
const PORT = 3000;

global.dirname = path.resolve("src");

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// setup sessions
const secret = crypto.randomBytes(64).toString("hex");
app.use(
  Session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'))

app.use("/", dashboard);
app.use("/login", login);
app.use("/register", register);
app.use("/content", contentApi);
app.use("/history", history);

app.listen(PORT, ()=>{
    console.log("listening on port: " + PORT);
});