let cat = require("../database/cat");
let post = require("../database/product");

module.exports = (express) => {
    let router = express.Router();
    router.get('/', (req, res) => {
        cat.all()
            .then(bbs => res.json({ "result": bbs }))
            .catch(err => res.json({ "error": err }))
    });
    router.get('/save', (req, res) => {
        let data = { "name": "Telepathy" };
        cat.save(data)
            .then(result => res.json({ "result": result }))
            .catch(err => res.json({ "error": err }))
    });

    router.get("/update", (req, res) => {
        let data = {
            "id": "5d062af38e0eda09c8c52aa3",
            "name": "Testomonia"
        };
        cat.update(data)
            .then(result => res.json({ "result": result }))
            .catch(err => res.json({ "error": err }))
    })

    router.get("/destroy", (req, res) => {
        let id = "5d062af38e0eda09c8c52aa3";
        cat.destroy(id)
            .then(result => res.json({ "result": result }))
            .catch(err => res.json({ "error": err }))
    });

    router.get("/catpost", (req, res) => {
        cat.getPost("_id", "cat_id", "posts")
            .then(result => res.json({ "result": result }))
            .catch(err => res.json({ "error": err }))
    });

    router.get('/savepost', (req, res) => {
        let data = { "title": "Cycle", "cat_id": "5d0636eec7b7481c0c8284b7", "content": "Cycle Hey Hey Hey" };
        post.save(data)
            .then(result => res.json({ "result": result }))
            .catch(err => res.json({ "error": err }))
    });

    return router;

}