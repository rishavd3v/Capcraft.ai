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

    console.log(req.file);
    res.json({ message: 'Image uploaded successfully'});
    let path = req.file.path;
    let mimeType = req.file.mimetype;
    
    await generate(path,mimeType);
    
    fs.unlink(req.file.path, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('File deleted successfully');
        }
    });

});

module.exports = router;