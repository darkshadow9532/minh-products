module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            idModel: String,
            typeModel: String,
            history: Array
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
  
    const History = mongoose.model("histories", schema);
    return History;
  };