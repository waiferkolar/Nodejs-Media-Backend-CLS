let fs = require("fs");
let product = require("./product");
let caty = require("./cat");
let seedProduct = () => {
    fs.readFile("products.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        let products = JSON.parse(data);
        products.forEach((pduct) => {
            let proObj = {
                "cat_id": pduct.cat_id,
                "name": pduct.name,
                "price": pduct.price,
                "image": pduct.image,
                "description": pduct.description,
                "since": new Date(),
            }
            product.save(proObj)
                .then(res => console.log("Aung Tal"))
                .catch((err) => console.log("fail"))
        })
    });
}
let seedCat = () => {
    fs.readFile("categories.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        let cats = JSON.parse(data);
        cats.forEach((cat) => {
            let proObj = {
                "id": cat.id,
                "name": cat.name,
                "image": cat.image,
                "since": new Date(),
            }
            caty.save(proObj)
                .then(res => console.log("Aung Tal"))
                .catch((err) => console.log("fail"))
        })
    });
}
module.exports = {
    seedProduct,
    seedCat
}