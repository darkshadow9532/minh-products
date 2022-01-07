serialize = function(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

var Product = Backbone.Model.extend({
    urlRoot: "/api/products"
});

class CretaProduct extends Product {
    constructor(obj){
        super(obj);
    }
    set_temp_product(row, attributes_cols_map){
        attributes_cols_map.forEach(attr => {
            this.set(attr.attribute, row[attr.col] || "");
        })
        this.set("type", "TEMP");
    }
    getName = () => {
        return this.get("name") || "";
    }
    getDescription = () => {
        return this.get("description") || "";
    }
    getPrice = () => {
        return this.get("price") || "";
    }
    getImages = () => {
        return this.get("images") || [];
    }
    getType = () => {
        return this.get("type" || "");
    }
    getId = () => {
        return this.get("id" || "");
    }
}

var CretaProducts = Backbone.Collection.extend({
    model: CretaProduct
});

class CretaProductsV2 {
    constructor(){
        this.products = [];
    }
    getProductsOfFile = (filename) => {
        var query = {
            "source.filename": filename
        }
        console.log(serialize(query));
        var that = this;
        that.products = [];
        $.get("/api/products?" + serialize(query), function(data){
            data.forEach(function(e){
                that.products.push(new CretaProduct(e));
            })
        })
    }
    getByQuery = (query) => {
        var that = this;
        that.products = [];
        $.get("/api/products?" + serialize(query), function(data){
            data.forEach(function(e){
                that.products.push(new CretaProduct(e));
            })
        })
    }
}