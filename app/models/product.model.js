module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            code: String,
            description: String,
            attributes: Array,
            name: String,
            type: String,
            source: Object,
            price: Number,
            status: String
        },
        { 
            timestamps: true 
        }
    );
  
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Product = mongoose.model("products", schema);
    return Product;
  };