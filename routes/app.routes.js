const postsController = require("../controllers/posts.controller");
const express = require("express");
const router = express.Router();

router.post("/posts",postsController.create);
router.get("/posts",postsController.findAll);
router.get("/posts/:id",postsController.findOne);
router.put("/posts/:id",postsController.update);
router.delete("/posts/:id",postsController.delete);

module.exports=router;