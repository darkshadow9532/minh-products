var express = require('express');
const { route } = require('.');
var router = express.Router();

var adapter = require("./adapter/adapter");

router.get('/fe_image', function(req, res){
    console.log("gg");
    res.render('image/test');
})

router.post('/image_adapter', async function(req, res){
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/adapter/temp_images/' + sampleFile.name;
    console.log(uploadPath);
    sampleFile.mv(uploadPath, function(err) {
        if (err)
        return res.status(500).send(err);

        adapter.uploadImage(uploadPath, function(r){
            console.log(r);
        });
        
        res.send({
            link: "/images/" + sampleFile.name
        });
    });
    // var form = new http.FormData();
    // uploadImage(sampleFile);
})

async function download_v2(url, filename) {
    var res = await fetch(url);
    res.body.pipe(fs.createWriteStream(__dirname + '/adapter/temp_images/' + filename));

}

download_v2("")

module.exports = router;