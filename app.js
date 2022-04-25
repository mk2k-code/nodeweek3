// 1. router
// 2. modul 資料 模型
// 3. view  視圖 使用者看到的畫面(前端)
// 4. controller 控制器 商業邏輯 (callback function)
//  MVC
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// 載入路由
const indexRouter = require("./routes/index");
const ipRouter = require("./routes/ip");
const todosRouter = require("./routes/todos");
const postsRouter = require("./routes/posts");
const cors = require("cors");
require("./db");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 1st level router
app.use("/", indexRouter);
app.use("/ip", ipRouter);
app.use("/todos", todosRouter);
app.use("/posts", postsRouter);

app.use((req, res, next) => {
	res.status(404).send("<h1>404 Error: 無此路由!</h1>");
});

module.exports = app;
