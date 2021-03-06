const { exec } = require("child_process");

exec("ffmpeg -i cover_1.jpg -filter_complex drawtext=fontfile=timesnewroman.ttf:text='Snehal':fontcolor=000000:fontsize=52.5:x=0:y=0 output-cover_1.jpg -y", (error, stdout, stderr) => {
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



router.post('/generateCommand', (req, res) => {
    let { commandArray } = req.body;
    for (let i = 0; i < commandArray.length; i++) {
        exec(commandArray[i], { cwd: 'public' }, (error, stdout, stderr) => {
            if (error) {
                //  console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                // console.log(`stderr: ${stderr}`);
                return;
            }
            // console.log(`stdout: ${stdout}`);
        });
    }
    return res.status(200).json({
        message: 'success'
    });
});