const postServices = require("../services/posts.services");
const upload = require("../middleware/upload");

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        }
        else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
            //const path =  req.file.path;

            var model = {
                postTitle: req.body.postTitle,
                postDescription: req.body.postDescription,
                postImage: path != "" ? url + "/" + path : "",
                //postImage: path,
            };
            postServices.createPost(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Succes",
                        data: results
                    });
                }
            });
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        postTitle: req.query.postTitle,
    };
    postServices.getPosts(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};

exports.findOne = (req, res, next) => {
    var model = {
        postId: req.params.id,
    };
    postServices.getPostById(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        }
        else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                postId : req.params.id,
                postTitle: req.body.postTitle,
                postDescription: req.body.postDescription,
                postImage: path != "" ? url + "/" + path : "",
            };
            postServices.updatePost(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Succes",
                        data: results
                    });
                }
            });
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        postId: req.params.id,
    };
    postServices.deletePost(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: results
            });
        }
    });
};