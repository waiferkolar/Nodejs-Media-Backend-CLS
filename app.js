let express = require("express")
let app = express();
let bodyParaser = require("body-parser")
let passport = require("passport")
let jwt = require("jsonwebtoken")
let guestRoute = require("./routes/guest")(express)
let userRoute = require("./routes/user")(express, jwt)
let adminRoute = require("./routes/admin")(express, passport)
let path = require('path')


let JWTStrategy = require("passport-jwt").Strategy
let ExtractJWT = require("passport-jwt").ExtractJwt
let dbUser = require("./database/dbuser")
let seeder = require("./database/seeder")

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'secret';

my_strategy = new JWTStrategy(jwtOptions, (payload, next) => {
    let email = payload.email;
    let name = payload.name;
    console.log(payload)
    dbUser.findByEmail(email)
        .then(usr => {
            console.log(usr)
            if (usr.name == name) {
                next(null, usr)
            } else {
                next("Creditial Error", null)
            }
        })
});

app.use(express.static(path.join("./assets")))

app.use(passport.initialize())
passport.use(my_strategy)


app.use(bodyParaser.json())
app.use(bodyParaser.urlencoded({ extended: true }))
app.use("/guest", guestRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)

app.listen("3000");



