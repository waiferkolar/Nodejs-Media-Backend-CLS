let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/mydb";
let connect = mongoose.connect(url, { useNewUrlParser: true });
let Schema = mongoose.Schema;
let autoincrement = require("mongoose-auto-increment")
let mongoosePaginate = require('mongoose-paginate');
autoincrement.initialize(mongoose.connection)


let CatScheme = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    since: { type: Date, required: true }
});

let GalleryScheme = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
});

let ProudtScheme = new Schema({
    cat_id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    since: { type: Date, required: true }
});


let UserScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    since: { type: Date, required: true }
})

let Cat = mongoose.model("category", CatScheme);
ProudtScheme.plugin(autoincrement.plugin, "product");
ProudtScheme.plugin(mongoosePaginate)
let Product = mongoose.model("product", ProudtScheme);
let User = mongoose.model("user", UserScheme);
GalleryScheme.plugin(autoincrement.plugin, "gallery");
let Gallery = mongoose.model('gallery', GalleryScheme);


module.exports = {
    Cat,
    Product,
    User,
    Gallery
}