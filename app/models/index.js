const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model")(mongoose);
db.histories = require("./history.model")(mongoose);
db.forms = require("./form.model")(mongoose);
db.files = require("./file.model")(mongoose);
module.exports = db;