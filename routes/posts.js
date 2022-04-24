var express = require("express");
var router = express.Router();
const Post = require("../models/modPost");
const postsControllers = require("../controllers/posts");

/* GET users listing. */
// router.get('/', async function(req, res, next) {
//   const post =await Post.find()
//   res.status(200).json({
//     "posts":post
//   })
// });
// posts = [];
router.get("/", function (req, res, next) {
	postsControllers.getPosts(req, res);
});

router.get("/:id", function (req, res, next) {
	postsControllers.getPost(req, res);
});

router.post("/", function (req, res, next) {
	postsControllers.postPost(req, res);
});

router.delete("/", function (req, res, next) {
	postsControllers.delPosts(req, res);
});

router.delete("/:id", function (req, res, next) {
	postsControllers.delPost(req, res);
});

router.patch("/:id", function (req, res, next) {
	postsControllers.patchPost(req, res);
});

module.exports = router;
