let db = require("./db")
let User = db.User


let save = (userObj) => {
    return new Promise((resolve, reject) => {
        let user = new User(userObj);
        user.save((err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    });
}

let findById = (id) => {
    return new Promise((resolve, rejcect) => {
        User.findById(id, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}
let findByEmail = (email) => {
    return new Promise((resolve, rejcect) => {
        User.findOne({ "email": email }, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    save,
    findById,
    findByEmail
}