const { exec } = require("child_process");

let commandArray = [
  "ffmpeg -i cover_1.jpg -i bmw.png -filter_complex [1]scale=52.5:52.5[t],[0][t]overlay=450:336[i1];[i1]drawtext=fontfile=timesnewroman.ttf:text='snehal':fontcolor=#ffffff:fontsize=52.5:x=0:y=0 output-cover_1.jpg -y",
  "ffmpeg -i cover_2.jpg -i bmw.png -filter_complex [1]scale=52.5:52.5[t],[0][t]overlay=450:336[i1];[i1]drawtext=fontfile=timesnewroman.ttf:text='snehal':fontcolor=#ffffff:fontsize=52.5:x=0:y=0 output-cover_2.jpg -y",
  "ffmpeg -i cover_3.jpg -i bmw.png -filter_complex [1]scale=35:35[t],[0][t]overlay=300:224[i1];[i1]drawtext=fontfile=timesnewroman.ttf:text='snehal':fontcolor=#ffffff:fontsize=35:x=0:y=0 output-cover_3.jpg -y",
  "ffmpeg -i cover_3.jpg -i bmw.png -filter_complex [1]scale=35:35[t],[0][t]overlay=300:224[i1];[i1]drawtext=fontfile=timesnewroman.ttf:text='snehal':fontcolor=#ffffff:fontsize=35:x=0:y=0 output-cover_3.jpg -y",
 ]

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