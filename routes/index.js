const Car = require('../model/car');
const People = require('../model/people');
const Login = require('../model/login')
var express = require('express');
var router = express.Router();   //接受路由模块暴露的接口
const multer = require('multer');
const cors = require('cors')
//cors跨域
router.use(cors())

// 自定义路径存放和文件名
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + file.originalname)
  }
})
//创建multer对象
var upload = multer({ storage: storage });

//首页2 vue
router.get('/aaa/ss2', (req, res) => {
  Car.find({}).populate('p').exec(function (err, doc) {
    res.json({
      code: 200,
      data: doc
    })
  })
})

/* GET home page. */
//登录页面
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/doLogin', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  Login.find({ username, password }).then(mon => {
    if (mon.length > 0) {
      res.cookie('username', req.body.username)
      res.json({
        code: 200,
        msg: "登陆成功"
      })
    } else {
      res.json({
        code: 101,
        msg: "用户名或者密码不正确"
      })
    }
  })
})
// 因为express路由是从上往下执行的，所以可以使用中间件进行登陆拦截，从而实现拦截页面没登陆和登录状态进行跳转
// 凡是/开头的需要进行拦截
router.all('/*', (req, res, next) => {
  // 判断有没有登录
  if (req.cookies.username) {  //如果用户名存在，说明已经登陆过
    next()
  } else {  // 否则你没有登录，跳回登陆页面
    res.redirect('/login')  // 路由重定向到login页面
  }
})
// 首页
router.get('/', function (req, res, next) {
  Car.find({}).populate('p').exec(function (err, doc) {
    res.render('index', { list: doc })
  })
});
// 首页 加载用户列表信息
router.get('/news', (req, res) => {
  var page = req.query.page ? Number(req.query.page) : 1
  var pagesize = req.query.pagesize ? Number(req.query.pagesize) : 1
  // console.log(page,pagesize)
  var skipt = (page - 1) * pagesize
  var limitt = pagesize
  // console.log(skipt,limitt)
  Car.find({}).populate('p').skip(skipt).limit(limitt).exec(function (err, data) {
    // console.log(data);
    res.json({
      code: 200,
      list: data
    })
  })
})

// 删除信息
router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  Car.findByIdAndDelete(id).then(con => {
    res.json({
      code: 200,
      msg: "删除成功"
    })
  })
})
// 删除cookie
router.get('/dodelete', (req, res) => {
  res.clearCookie('username');
  res.json({
    code: 200,
    msg: '退出登录'
  })
})
// 添加页面显示
router.get('/add', (req, res) => {
  People.find().then(mon => {
    res.render('add', {
      list: mon
    });
  })
})
// 添加页面 图片上传接口
router.post('/upload', upload.single('avatar'), function (req, res, next) {
  if (req.file) {
    res.json({
      code: 200,
      path: req.file.path
    })
  }
})
// 添加页面 添加数据
router.post('/doAdd', (req, res) => {
  const car = new Car({
    carname: req.body.carname,
    imgname: req.body.imgname,
    p: req.body.username
  });
  car.save().then(mon => {
    res.json({
      code: 200,
      msg: "添加成功"
    })
  })
})

// 修改页面
router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
  Car.findById(id).populate('p').exec(function (err, doc) {
    console.log(doc)
    res.render('edit', {
      list: doc
    })
  })
})
router.put('/doEdit', (req, res) => {
  var id = req.body.id;
  Car.findByIdAndUpdate(id, {
    carname: req.body.carname,
    imgname: req.body.imgname,
    p: req.body.username  //这里获取的是p对应的id哦
  }).then((data) => {
    res.json({
      code: 200,
      msg: "数据修改成功"
    })
  })
})
router.get('/click', (req, res) => {
  People.find().then(data => {
    res.json({
      list: data
    })
  })
})




module.exports = router;
