const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const generate = require("./generate.js");

// const {initializeApp} = require("firebase/app");
// const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");
// const fireBaseConfig = require("../firebase.config.js");
// initializeApp(fireBaseConfig.config);

// const storage = getStorage();
// const upload = multer({storage:multer.memoryStorage()});

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
    
    if (mimeType !== 'image/png' && mimeType !== 'image/jpeg'){
        return res.status(400).json({ message: 'File type not supported.' });
    }
    let output = await generate(path,mimeType);
    res.send(output);
    console.log("Done");
    fs.unlink(req.file.path, err => {
        if (err) {
            console.error(err);
        }
    });

});

module.exports = router;