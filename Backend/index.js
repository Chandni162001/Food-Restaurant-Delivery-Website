const express = require('express')
const dotenv = require('dotenv')           //dotenv imported
const cors = require('cors')
dotenv.config()                            // provide access to dotenv
const PORT = process.env.PORT || 8000;
const connection = require('./databaseConnect/DbConnect')
const authRouter = require("./routes/authRoute")
const productRouter = require("./routes/ProductRoute")
const bodyParser = require("body-parser")

//router and app keywords are used to write js in backend using express.

const router = express.Router()     //Router() -predefined function,provides js free
const app = express()
app.use('/static', express.static(__dirname+ '/uploadImages'))

// connection();
app.use(router)

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,               // Allow credentials
    optionsSuccessStatus: 200        // Some legacy browsers choke on 204
  };
  
app.use(cors(corsOptions));


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/user", authRouter)
app.use("/api/product", productRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

