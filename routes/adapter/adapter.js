const FormData = require('form-data');
const fetch = require('node-fetch');
const fs= require('fs');aa
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

function getFileNameOfUrl(url){
  var result = "";
  if (typeof url == "string"){
    var removeDash = url.split("/");
    if( removeDash.length > 0){
      var removeQuestion = removeDash[removeDash.length - 1].split("?");
      result = removeQuestion[0];
    }
  } else {
    result = Date.now() + ".jpg";
  }
  return result;
}
function downloadImage(url, filename){
  var name = getFileNameOfUrl(url);

  if (!filename){
    filename = name;
  }
  var filePath = __dirname + '/temp_images/' + filename;
  var fileStream = fs.createWriteStream(filePath);
  fetch(url).then(res => {
    res.body.pipe(fileStream);
    res.body.on('error', function(){
      console.log("error");
    })
    fileStream.on('finish', function(){
      console.log("OK");
      uploadImage(filePath);
    });
  })
}

var url="https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA"

downloadImage(url);
// uploadImage(__dirname + "/temp_images/vonuoc.jpg");
// downloadImage("url");

module.exports.uploadImage = uploadImage;