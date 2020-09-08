const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const serverUrl = 'http://localhost:5000';
const { exec } = require("child_process");

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
 
router.post('/upload', upload.array('images'), (req, res, next) => {
  console.log("req.files", req.files)
 let {firstImageHeight, firstImageWidth, ratio} = req.body;
     try {
        sharp(req.files[0].path).resize({width: parseInt(firstImageWidth), height : parseInt(firstImageHeight)}).toFile('public/' + 'thumbnails-' + req.files[0].originalname, (err, resizeImage) => {
            if (err) {
                console.log(err);
            } else {
                console.log(resizeImage);
            }
        })
       
        return res.status(201).json({
          data : {
            thumbnailPath : `${serverUrl}/thumbnails-${req.files[0].originalname}`,
            ratio : {
              firstImageHeight: firstImageHeight,
              firstImageWidth: firstImageWidth,
              ratio: ratio
            }
          },
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/uploadLogoWatermark', upload.array('images'), (req, res) => {
   
});


router.post('/generateCommand', (req, res) => {
  let {commandArray} = req.body;

 for(let i=0; i<commandArray.length; i++){
    exec(commandArray[i], (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
});



module.exports = router;
