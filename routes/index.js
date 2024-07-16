const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const generate = require("./generate.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

router.get("/",(req,res)=>{
    res.render("home");
});

router.post('/upload', upload.single('image'), async (req, res) => {
    // req.file is the 'image' file
    // req.body will hold the text fields, if there were any
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    let path = req.file.path;
    let mimeType = req.file.mimetype;
    
    let output = await generate(path,mimeType);
    if(output.startsWith("Error")){
        res.status(500).send("Unexpected Error");
    }
    else res.send(output);
    console.log("Done");
    fs.unlink(req.file.path, err => {
        console.log("File Deleted!!!");
        if (err) {
            console.error(err);
        }
    });

});

module.exports = router;