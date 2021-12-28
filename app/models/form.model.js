module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            type: String,
            attributes: Array
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
  
    const Form = mongoose.model("forms", schema);
    return Form;
  };