const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const generate = require("./generate.js");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, "image"+path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

router.get("/",(req,res)=>{
    res.render("home");
});

router.post('/upload', upload.single('image'), (req, res) => {
    // req.file is the 'image' file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    res.json({ message: 'Image uploaded successfully' });
    generate();

});

module.exports = router;