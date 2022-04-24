const express = require('express');
const router = express.Router();
const Post = require("../models/modTodo");
const todosControllers = require("../controllers/todos");

/* GET users listing. */
router.get("/", function (req, res, next) {
	todosControllers.getTodos(req, res);
});

router.get("/:id", function (req, res, next) {
	todosControllers.getTodo(req, res);
});

router.post("/", function (req, res, next) {
	todosControllers.postTodo(req, res);
});

router.delete("/", function (req, res, next) {
	todosControllers.delTodos(req, res);
});

router.delete("/:id", function (req, res, next) {
	todosControllers.delTodo(req, res);
});

router.patch("/:id", function (req, res, next) {
	todosControllers.patchTodo(req, res);
});

module.exports = router;
