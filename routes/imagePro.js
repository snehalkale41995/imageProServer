const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const serverUrl = 'http://localhost:5000'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
        // + path.extname(file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        sharp(req.file.path).resize(200, 200).toFile('public/' + 'thumbnails-' + req.file.originalname, (err, resizeImage) => {
            if (err) {
                console.log(err);
            } else {
                console.log(resizeImage);
            }
        })
        return res.status(201).json({
            thumbnailPath : `${serverUrl}/thumbnails-${req.file.originalname}`,
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
