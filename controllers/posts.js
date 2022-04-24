const Post = require('../models/modPost');
const headers = require("../util/httpHeader");
const { errorHandle, resWriteData } = require("../util/httpMsg");

// const http = require("http");

const posts = {
	async getPosts(req, res) {
		const posts =  await Post.find();
		// resWriteData(res, posts);
		res.status(200).json({
			data: posts
		})
	},

	async getPost(req, res) {
		try {
			const id = req.params.id;
			const post = await Post.findById(id);
			if (post) {
				res.status(200).json({
					data: post
				})
			} else {
				errorHandle(req, res, 40001);
			}
		} catch (error) {
			errorHandle(req, res, 40002);
		}
	},

	async postPost(req, res) {
		try {
			const data = req.body;
			if (data) {
				const newPost = await Post.create(data);
				resWriteData(res, newPost);
			} else {
				errorHandle(req, res, 40001);
			}
		} catch (error) {
			errorHandle(req, res, 40002);
		}
	},

	async delPosts(req, res) {
		const posts = await Post.deleteMany({});
		resWriteData(res, posts);
	},

	async delPost(req, res) {
		try {
			const id = req.params.id;
			const post = await Post.findById(id);
			if (post) {
				await Post.findByIdAndDelete(id)
					.then(() => {
						resWriteData(res, post);
						console.log("刪除成功");
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				errorHandle(req, res, 40001);
			}
		} catch (error) {
			errorHandle(req, res, 40002);
		}
	},

	async patchPost(req, res) {
		try {
			const id = req.params.id;
			const data = req.body;
			// const data = JSON.parse(body);
			const post = await Post.findById(id);
			if (post) {
				await Post.findByIdAndUpdate(id, { $set:data }, { new: true, runValidators: true, useFindAndModify: false, })
				.then((result) => {
					resWriteData(res, result);
					console.log(result);
					console.log("更新成功");
				})
				.catch((error) => {
					errorHandle(req, res, 40002);
					console.log("update資料格式有問題");
				});
			} else {
				errorHandle(req, res, 40001);
			}
		} catch (error) {
			errorHandle(req, res, 40002);
			console.log("資料格式有問題");
		}
	},
};

module.exports = posts;
