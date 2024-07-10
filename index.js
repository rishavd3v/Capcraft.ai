const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path")
const indexRouter = require("./routes/index");
const app = express();

app.set("view engine","ejs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname,'public')));

app.use(indexRouter);


const port = process.env.PORT;
app.listen(port,()=>{
    console.log("App is running on port "+port);
});