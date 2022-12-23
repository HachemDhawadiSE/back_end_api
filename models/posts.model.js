const mongoose = require("mongoose");

const post = mongoose.model(
    "posts",
    mongoose.Schema({
        postTitle : String,
        postDescription : String,
        postImage : String
    },{
        timestamps : true,
    })
);

module.exports = {
    post
}