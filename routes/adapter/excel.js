var path = __dirname + "/../data/" + "123";
var xlsx = require('node-xlsx');
var obj = [];
try {
    obj = xlsx.parse(path); // parses a file    
} catch (e) {
    console.log(e);
}
console.log(obj);