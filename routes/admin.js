let dbProduct = require("../database/product")
module.exports = (express, passport) => {
    let router = express.Router();
    router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
        res.json({ "page": "Admin Home Page" })
    });
    router.get("/post", (req, res) => {
        res.json({ "page": "Admin Post Page" })
    });
    router.post("/product/create", passport.authenticate("jwt", { session: false }), (req, res) => {
        let obj = {
            "cat_id": req.body.cat_id,
            "name": req.body.name,
            "price": req.body.price,
            "image": req.body.image,
            "description": req.body.description,
            "since": new Date()
        }
        dbProduct.save(obj)
            .then(result => res.send(result))
            .catch(err => res.send(err))
    });
    router.get("/product/paginate/:start/:count", passport.authenticate("jwt", { session: false }), (req, res) => {
        let start = req.param("start")
        let count = req.param("count")
        dbProduct.paginate(Number(start), Number(count))
            .then(result => res.send(result))
            .catch(err => res.send(err))
    });
    return router;
}