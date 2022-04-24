const Todo = require("../models/modTodo");
const headers = require("../util/httpHeader");
const { errorHandle, resWriteData } = require("../util/httpMsg");

const todos = {
	async getTodos(req, res) {
		const todos = await Todo.find();
		resWriteData(res, todos);
	},

	async getTodo(req, res){
		try {
			const id = req.params.id;
			const todo = await Todo.findById(id);
			if (todo) {
				resWriteData(res, todo);
			} else {
				errorHandle(req, res, 40001);
			}
			
		} catch (error) {
			errorHandle(req, res, 40002);
		};
	},

	async postTodo(req, res){
		try {
			const title = req.body;
			if (title) {
				const todo = await Todo.create( title);
				resWriteData(res, todo);
			} else {
				errorHandle(req, res, 40001);
			}
			
		} catch (error) {
			errorHandle(req, res, 40002);
		};
	},

	async delTodos(req, res) {
		const todos = await Todo.deleteMany({});
		resWriteData(res, todos);
	},

	async delTodo(req, res) {
		try {
			const id = req.params.id;
			const todo = await Todo.findById(id);
			if (todo) {
				await Todo.findByIdAndDelete(id)
					.then(() => {
						resWriteData(res, todo);
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

	async patchTodo(req, res) {
		try {
			const id = req.params.id;
			const updateTodo = req.body;
			const todo = await Todo.findById(id);
			const todoUpdate = {
				id: id,
				updat_data:updateTodo
			};
			if (todo) {
				await Todo.findByIdAndUpdate(id, { updateTodo })
					.then(() => {
						resWriteData(res, todoUpdate);
						console.log("更新成功");
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				errorHandle(req, res, 40001);
				console.log("無此資料");
			}
		} catch (error) {
			errorHandle(req, res, 40002);
		}
	},
}

module.exports = todos;
