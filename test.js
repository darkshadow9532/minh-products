const FormData = require('form-data');
const fetch = require('node-fetch');
const fs= require('fs');
const path = require('path');
// var express = require('express');
// var router = express.Router();


const IMAGE_SERVER_URL = "http://localhost:3000/upload";

const IMAGE_API_URL = "http://localhost:3000/api/images"
// router.post('/image_adapter', function(req, res){
//     let sampleFile;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     sampleFile = req.files.sampleFile;
//     var form = new http.FormData();
//     uploadImage(sampleFile);
// })
function getNameFromPath(filePath){
  var array = filePath.split("/");
  var fileName = array[array.length - 1];
  return fileName || "";
}

function uploadImage(filePath, callback) {
    var fileName = getNameFromPath(filePath);    
    var imageBuffer = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('sampleFile', imageBuffer, {
      contentType: 'image/jpeg'
    });
    fetch(IMAGE_SERVER_URL, { method: 'POST', body: form })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          var image = {
            link: response.data.link,
            name: fileName
          }
          fetch(IMAGE_API_URL, {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}).then(res => {
            callback(res);
          });      
        } else {
          callback();
        }
      });
    

    fs.unlink(filePath, (err) => {});
};

function download(url) {
    fetch(url).then(res => {
        // console.log(res)
        res.buffer().then(buff => {
            console.log(buff);
        })
    });    
}

// async function download_v2(url) {
//     var res = await fetch(url);
//     var buffer = await res.buffer();
//     const form = new FormData();
//     form.append('formFile', buffer);
//     console.log(form);
//     var response = await fetch(IMAGE_SERVER_URL, { method: 'POST', body: form })
//     console.log(response);
//     // if(response.status >= 200 && response.status < 300){
//     //     console.log(response.data);
//     // }
// }

async function download_v2(url, filename) {
    var res = await fetch(url);
    res.body.pipe(fs.createWriteStream(__dirname + '/routes/adapter/temp_images/' + filename));

}


download_v2("https://kbvision.vn/wp-content/uploads/2021/04/KX-A2111C4.png", "KX-A211C4");
// download("https://kbvision.vn/wp-content/uploads/2021/04/KX-A2111C4.png");
// get_image("https://kbvision.vn/wp-content/uploads/2021/04/KX-A2111C4.png");
// uploadImage(__dirname + "/temp_images/vonuoc.jpg");

module.exports.uploadImage = uploadImage;
module.exports.download = download;