const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path")
const app = express();
const fs = require("fs");
const indexRouter = require("./routes/index");

app.set("view engine","ejs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname,'public')));

const uploadsDir = path.join(__dirname, 'uploads');
fs.chmod(uploadsDir, 0o777, (err) => {
    if (err) throw err;
});

app.use(indexRouter);


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("App is running on port "+port);
});