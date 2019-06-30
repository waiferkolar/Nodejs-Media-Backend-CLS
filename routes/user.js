let pgen = require("../helpers/passgen")
let user = require("../database/dbuser")

module.exports = (express, jwt) => {
    let router = express.Router();
    router.post('/register', (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        pgen.encrypt(password)
            .then(pass => {
                user.save({
                    "name": name, "email": email, "password": pass,
                    "since": new Date()
                })
                    .then(result => res.send({ "con": true, "data": result }))
                    .catch((err) => res.send({ "con": false, "data": err }))
            })
    });
    router.post('/login', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        user.findByEmail(email)
            .then(usr => {
                pgen.compare(password, usr.password)
                    .then(result => {
                        if (result) {
                            let payload = { "email": usr.email, "name": usr.name }
                            let token = jwt.sign(payload, "secret")
                            res.send({ "con": result, "token": token })
                        } else {
                            res.send({ "con": result })
                        }
                    })
                    .catch((re) => res.send({ "con": re }))
            })

    });

    return router;
}