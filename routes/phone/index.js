const Car = require('../../model/car');
const People = require('../../model/people');
const Login = require('../../model/login');
var express = require('express');
var router = express.Router();


/* GET users listing. */
// 文件模块首页
router.get('/pindex', (req, res, next) => {
    Car.find({}).populate('p').exec(function (err, doc) {
        // console.log(doc);
        res.render('phone/phoneindex', {
            list: doc
        });
    });
});
router.get('/pindex/news', (req, res, next) => {
    var page = req.query.page ? Number(req.query.page) : 1;
    var pagesize = req.query.pagesize ? Number(req.query.pagesize) : 1;
    var skipt = (page - 1) * pagesize;
    var limitt = pagesize;
    Car.find({}).populate('p').skip(skipt).limit(limitt).exec(function (err, data) {
        // console.log(data)
        res.json({
            code: 200,
            list: data
        });
    });
});
// 
router.get('/padd', (req, res, next) => {
    res.render('phone/phoneadd');
});
// 
router.get('/plogin', (req, res, next) => {
    res.render('phone/phonelogin');
});

//admin
router.get('/admin/index', function (req, res, next) {
    res.render('admin/index');
});
router.get('/admin/login', function (req, res, next) {
    res.render('admin/login')
})
router.get('/admin/htable', function (req, res, next) {
    res.render('admin/htable')
})
router.get('/admin/echarts', function (req, res, next) {
    res.render('admin/echarts')
})
router.get('/admin/base', function (req, res, next) {
    res.render('admin/base')
})
router.get('/admin/ftoshow', function (req, res, next) {
    res.render('admin/ftoshow')
})

module.exports = router;
