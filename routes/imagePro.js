const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const _ = require("lodash")
const fs = require('fs')
const serverUrl = 'http://localhost:5000';

const { exec } = require("child_process");
const { func } = require('joi');

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

    let { firstImageHeight, firstImageWidth, ratio } = req.body;
    try {
        sharp(req.files[0].path).resize({ width: parseInt(firstImageWidth), height: parseInt(firstImageHeight) }).toFile('public/' + 'thumbnails-' + req.files[0].originalname, (err, resizeImage) => {
            if (err) {
                console.log(err);
            } else {
                //   console.log(resizeImage);
            }
        })

        return res.status(201).json({
            data: {
                thumbnailPath: `${serverUrl}/thumbnails-${req.files[0].originalname}`,
                ratio: {
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


router.post('/generateCommnd', async (req, res) => {
    let imageProps = req.body;
    let command; commandArray = [], finalImages = [];

    imageProps.map((imageObj) => {
        finalImages.push(`output-${imageObj.imageName}`)
        command = `ffmpeg -i ${imageObj.imageName} `;

        ///inner loop
        imageObj.watermarks.map((watermark) => {
            if (watermark.watermarkType === "logo") {
                command += `-i ${watermark.logoFileName} `
            }
        })
        //end inner loop
        command += ` -filter_complex `
        let sortedWatermarks = _.orderBy(imageObj.watermarks, ['watermarkType'], ['asc']);
        var count = _.countBy(sortedWatermarks, function (rec) {
            return rec.watermarkType == "logo";
        });

        let logoCount = count.true;
        let textCount = count.false;

        for (let k = 0; k < sortedWatermarks.length; k++) {
            switch (sortedWatermarks[k]["watermarkType"]) {
                case 'logo': {
                    command += `[${k + 1}:v]scale=${sortedWatermarks[k]["width"]}:${sortedWatermarks[k]["height"]}[i${[k + 1]}];`;

                    if (k == 0) {
                        command += `[${k}:v][i${[k + 1]}]overlay=${sortedWatermarks[k]["x"]}:${sortedWatermarks[k]["y"]}[o${[k + 1]}];`
                    }
                    else {
                        if (k === logoCount - 1 && textCount === 0) {
                            command += `[o${k}][i${[k + 1]}]overlay=${sortedWatermarks[k]["x"]}:${sortedWatermarks[k]["y"]}`
                        }
                        else {
                            command += `[o${k}][i${[k + 1]}]overlay=${sortedWatermarks[k]["x"]}:${sortedWatermarks[k]["y"]}[o${[k + 1]}];`
                        }
                    }
                    break;
                }
                case "text": {
                    if (textCount !== 0) {
                        if (k === logoCount) {
                            command += `[o${logoCount}]drawtext=fontfile=timesnewroman.ttf:text='${sortedWatermarks[k]["waterMarkText"]}':fontcolor=${sortedWatermarks[k]["color"]}:fontsize=${sortedWatermarks[k]["size"]}:x=${sortedWatermarks[k]["x"]}:y=${sortedWatermarks[k]["y"]}`
                        }
                        if (textCount != 1 && k !== sortedWatermarks.length && k != logoCount) {
                            command += `,`
                        }
                        if (k != logoCount) {
                            command += `drawtext=fontfile=timesnewroman.ttf:text='${sortedWatermarks[k]["waterMarkText"]}':fontcolor=${sortedWatermarks[k]["color"]}:fontsize=${sortedWatermarks[k]["size"]}:x=${sortedWatermarks[k]["x"]}:y=${sortedWatermarks[k]["y"]}`
                        }
                    }
                }
            }
        }

        console.log("finalImages", finalImages)

        command += ` output-${imageObj.imageName} -y`
        commandArray.push(command);
    })

    generateCommand(commandArray, finalImages, req, res);

});


function generateCommand(commandArray, finalImages, req, res) {
    let responseImages = []
    for (let i = 0; i < commandArray.length; i++) {
        exec(commandArray[i], { cwd: 'public' }, (error, stdout, stderr) => {
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

    finalImages.forEach(image => {
        if (fs.existsSync(`./public/${image}`)) {
            responseImages.push(`${serverUrl}/${image}`)
        }
    });

    return res.status(200).json({
        data: responseImages,
        message: 'success'
    });
}

module.exports = router;
