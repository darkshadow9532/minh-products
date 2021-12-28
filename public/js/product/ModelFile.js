class CretaFile {
    constructor(name){
        var that = this;
        this.name = name;
        this._oUDs = [];
        $.post("/data", {
            name: this.name
        }, function(d){
            that.data = d;
        })
    }
    show = () => {
        console.log(this.data);
        return this.data;
    }
    getName = () => {
        return this.name;
    }
    getSheet = (i) => {
        return this.data[i] || [];
    }
    getData = () => {
        return this.data || [];
    }
    syncData = () => {

    }
    
    //Adddition func for View
    
}

class CretaFiles {
    constructor(){
        var that = this;
        that.files = [];
        that._oUDs = [];
        $.get("/list", function(files){
            files.forEach(function(file){
                var cf = new CretaFile(file);
                that.files.push(new CretaFile(file))
            })
            // that.onUpdateData();
        })
    }
}