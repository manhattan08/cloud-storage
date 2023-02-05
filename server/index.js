const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')


app.use(corsMiddleware)
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static('static'))
app.use(cors({
    origin:config.get("clientUrl")
}))
app.use("/auth", authRouter)
app.use("/files", fileRouter)


const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
