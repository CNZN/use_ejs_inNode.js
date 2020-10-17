const mongoose = require('mongoose'); //引用mongoose模块
mongoose.connect('mongodb://localhost:27017/0910', { useNewUrlParser: true, useUnifiedTopology: true })  //创立链接 确立表名

const Schema = mongoose.Schema;  //数据库模型规定  类似于用户信息

const userSchema = new Schema({  //制定数据字段和数据类型
    imgname: {
        type: String,
        default: ''
    },
    carname: {
        type: String,
        default: ''
    },
    p: {
        type: mongoose.SchemaTypes.ObjectId, //type类型比较特殊  和id关联
        ref: 'People'  // 指向定义schema里面的People
    }
})

// 开始操作数据库模型 User指的是表名
const Car = mongoose.model('Car', userSchema, 'car');
module.exports = Car;  //导出