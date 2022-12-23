const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
const {MONGO_DB_CONFIG} = require("./config/app.config");
const errors = require("./middleware/errors");




//mongoose.connect(process.env.MONGO_URL);

mongoose.connect(MONGO_DB_CONFIG.DB,()=>{
    console.log("connected");
    //useNewUrlParser:true,
    useUndifiedTopology:true
}).then(
    () =>{
        console.log("data base connected ");
    },
    (error) =>{
        console.log("data base not connected" + error);
    }
);

app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use("/api",require("./routes/app.routes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000,function(){
    console.log("Ready to Go!");
});