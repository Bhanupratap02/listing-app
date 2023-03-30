const express = require("express");
const app = express();
const config  = require("./config/config")
const cors = require('cors')
const hpp = require("hpp");
const morgan = require("morgan");
const connectDb = require("./config/dbConfig")

require('dotenv').config()


//middlewares enable
app.use(hpp());  // HTTP parameter pollution (HPP)
app.use(function(_, res, next) {
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('Content-Security-Policy', "frame-ancestors 'none'");
    res.set('X-Content-Type-Options', 'nosniff');
    next();
});
app.use(cors()) //cross origin allow
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));




//connect to DB
connectDb()





//api routes
app.use("/api/v1/product", require("./routes/product"));
app.use("/api/v1/category", require("./routes/category"));



//Catch 404 error
app.use((req, _, next) => {
    const error = new Error(`Unsupported Route.- ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

//Error handler functions
app.use((error, _, res, next) => {
    res.status(error.status || 500);
    console.log(error)
    res.json({
        error: {
            message: error.message || "Something went wrong in Server",
        },
    });
    next()
});




//listen to server
// const PORT = config.PORT || 8000;
const PORT = process.env.PORT || 5000;

module.exports = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
