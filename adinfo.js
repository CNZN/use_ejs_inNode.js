const Login = require('./model/login')
const login = new Login({
    username: 'admin2',
    password: '1728392'
})
login.save().then(res => {
    console.log(res)
})