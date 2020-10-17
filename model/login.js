const mongoose = require('mongoose'); //引用mongoose模块
mongoose.connect('mongodb://localhost:27017/0910', { useNewUrlParser: true, useUnifiedTopology: true })  //创立链接 确立表名

const Schema = mongoose.Schema;  //数据库模型规定  类似于用户信息

const userSchema = new Schema({  //制定数据字段和数据类型
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
})

// 开始操作数据库模型 User指的是表名
const Login = mongoose.model('Login', userSchema, 'login');
module.exports = Login;  //导出