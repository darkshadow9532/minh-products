exports.homepage = function(req, res, next) {
    res.render('index', { title: 'Products Creta' });
}


exports.dashboard = function(req, res, next) {
    res.render('product/dashboard', { title: 'Products Creta' });
}

exports.detail = (req, res) => {
    res.render('product/detail');
}

exports.products = (req, res) => {
    res.render('product/products');
}

exports.upload = (req, res, next) => {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../data/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
}

exports.getExcel = (req, res, next) => {
    var path = __dirname + "/../data/" + req.body.name;
    var xlsx = require('node-xlsx');
    var obj = [];
    try {
        obj = xlsx.parse(path); // parses a file    
    } catch (e) {

    }
    res.send(obj);
}

exports.getList = (req, res) => {
    const testFolder = __dirname + "/../data/";
    const fs = require('fs');
    fs.readdir(testFolder, (err, files) => {
        res.send(files);
    });
}