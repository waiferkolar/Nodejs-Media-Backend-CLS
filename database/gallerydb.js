let db = require('./db');
let Gallery = db.Gallery;

let save = (ary) => {
    return new Promise((resolve, reject) => {
        let bol = true;
        ary.forEach((image) => {
            let obj = {
                id: 0,
                name: image
            }
            let cat = new Gallery(obj);
            cat.save((err, data) => {
                if (err) {
                    bol = false;
                }
            })
        });
        if (bol) {
            resolve(bol);
        } else {
            reject(bol)
        }
    });


}
let all = () => {
    return new Promise((resolve, reject) => {
        Gallery.find({}, (err, data) => {
            if (err) reject(err)
            resolve(data)
        });
    })
}
module.exports = {
    save,
    all
}