const express = require('express')
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")

//引入users.js
const users = require("./routes/api/users")

const profiles = require("./routes/api/profiles")

//DB config
const db = require("./config/keys").mongoURI

//使用body-parser的中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//连接数据库
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => console.log("mongoDB Connected")) //成功
    .catch(err => console.log(err)) //失败


//passport初始化
app.use(passport.initialize())
require("./config/passport")(passport)

// app.get("/", (req, res) => {
//     res.send("Hello World!")
// })

//使用routes
app.use("/api/users", users)
app.use("/api/profiles", profiles)

const port = process.env.PORT || 5000


app.listen(port,() => {
    console.log(`server running on port ${port}`)
})

