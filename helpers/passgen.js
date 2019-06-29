let bcrypt = require("bcryptjs")

let encrypt = (pass) => {
    return new Promise((resolve, reject) => {
        let salt = bcrypt.genSaltSync(10);
        let encoded = bcrypt.hash(pass, salt);
        resolve(encoded);
    })
}
let compare = (plain, encode) => {
    return new Promise((resolve, reject) => {
        console.log(plain + " , " + encode)
        resolve(bcrypt.compare(plain, encode));
    })
}

module.exports = {
    encrypt,
    compare
}