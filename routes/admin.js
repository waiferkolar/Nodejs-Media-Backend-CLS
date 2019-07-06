let dbProduct = require("../database/product");
let cat = require("../database/cat");
let gal = require("../database/gallerydb");
let multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})
var upload = multer({ storage: storage })
module.exports = (express, passport) => {
    let router = express.Router();
    router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
        res.json({ "page": "Admin Home Page" })
    });
    router.get("/post", (req, res) => {
        res.json({ "page": "Admin Post Page" })
    });
    router.post('/image/upload', upload.array('image', 12), (req, res, next) => {
        let imgAry = [];
        req.files.forEach((file) => {
            imgAry.push(file.filename);
        });
        console.log(imgAry);
        gal.save(imgAry)
            .then((ret) => res.send({ con: true, data: ret }))
            .catch((err) => res.send({ con: false }))
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
    router.get('/cat/all', passport.authenticate('jwt', { session: false }), (req, res) => {
        cat.all()
            .then((ret) => res.json({ con: true, cats: ret }))
            .catch((err) => res.json({ con: false }));
    });
    return router;
}