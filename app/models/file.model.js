module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            data: Array,
            info: Object
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
  
    const CretaFile = mongoose.model("files", schema);
    return CretaFile;
  };