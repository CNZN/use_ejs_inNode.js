const Car = require('./model/car'); //引入carmongoose模块
const People = require('./model/people')
const Login = require('./model/login')
var createError = require('http-errors');  //错误机制 异常处理
var express = require('express');   //express框架
var path = require('path');         //路径解析 node内置模块  
var cookieParser = require('cookie-parser');  //引入第三方插件 cookie-parser  可以做登录校验
var logger = require('morgan');     //终端输出日志

var indexRouter = require('./routes/index');    //路由拆分第一步 引入差分的模块  indexRouter应是服务器共有的
var usersRouter = require('./routes/users');    //userRouter应是用户页面
var phoneRouter = require('./routes/phone');
// var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //__dirname 表示当前项目所在的目录 拼接两个路径 说白了就是获取绝对路径
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());     //解析json格式的数据
app.use(express.urlencoded({ extended: false }));    //解析urlencoded的数据格式
// xhr.open();  原生ajax发送post请求需要设置请求头
// xhr.setRequestHeader('content-type','application/x-www-from-urlencoded');
// xhr.send()
app.use(cookieParser());      //引入第三方插件
app.use(express.static(path.join(__dirname, 'public')));      //静态资源管控
app.use('/uploads',express.static('uploads'));  //第二个静态资源管控

app.use('/', indexRouter);    //走根路径的
app.use('/users', usersRouter);  //
app.use('/phone',phoneRouter);  //
// app.use('/admin',adminRouter);  //


// catch 404 and forward to error handler  
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 错误处理中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;   //暴露模块
