let db = require("./db");
let Cat = db.Cat;

let all = () => {
    return new Promise((resolve, reject) => {
        Cat.find({}, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let save = (obj) => {
    return new Promise((resolve, reject) => {
        let cat = new Cat(obj);
        cat.save((err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

let update = (obj) => {
    return new Promise((resolve, reject) => {
        Cat.findById(obj.id, (err, data) => {
            if (err) reject(err)
            data.name = obj.name;
            data.save((err, data) => {
                if (err) reject(err)
                resolve(data)
            });
        })
    });
}


let destroy = (id) => {
    return new Promise((resolve, reject) => {
        Cat.deleteOne({ _id: id }, err => {
            if (err) reject(err);
            resolve("successfully deleted.");
        })
    });
}
let getPost = (localId, foreignId, table) => {
    return new Promise((resolve, reject) => {
        Cat.aggregate([{
            $lookup: {
                from: table,
                localField: localId,
                foreignField: foreignId,
                as: "catposts"
            }
        }]).exec((err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    });
}

module.exports = {
    all,
    save,
    update,
    destroy,
    getPost
}