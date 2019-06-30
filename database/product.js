let db = require("./db");
let Product = db.Product;

let all = () => {
    return new Promise((resolve, reject) => {
        Product.find({}, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let save = (obj) => {
    return new Promise((resolve, reject) => {
        let product = new Product(obj);
        product.save((err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
let paginate = (start, count) => {
    var options = {
        sort: { _id: 1 },
        lean: true,
        page: start,
        limit: count
    };
    console.log("start : " + start + " count " + count);
    return new Promise((resolve, reject) => {
        Product.paginate({}, options, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    all,
    save,
    paginate
}