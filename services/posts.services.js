const { response } = require("express");
const {post} = require("../models/posts.model");

async function createPost(params,callback){
    if(!params.postTitle){
        return callback(
            {
                message: "Post Title Required",
            },
            ""
        );
    }
    const postModel = post(params);
    postModel
    .save()
    .then((response)=>{
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function getPosts(params,callback){
    const postTitle = params.postTitle;
    var condition = postTitle 
    ?{
        postTitle : {$regex : new RegExp(postTitle), $option:"i"}
    } 
    : {};

    post
    .find(condition)
    .then((response)=>{
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function getPostById(params,callback){
    const postId = params.postId;
    post
    .findById(postId)
    .then((response)=>{
        if(!response) callback("product Id Invalid!");
        else
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function updatePost(params,callback){
    const postId = params.postId;
    post
    .findByIdAndUpdate(postId,params,{useFindAndModify : false})
    .then((response)=>{
        if(!response) callback("product Id Invalid!");
        else
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function deletePost(params,callback){
    const postId = params.postId;
    post
    .findByIdAndRemove(postId)
    .then((response)=>{
        if(!response) callback("product Id Invalid!")
        else
        return callback(null,response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
}