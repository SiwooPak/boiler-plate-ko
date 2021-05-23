//express 모듈을 가져옴.
const express = require('express')
//express함수로 app을 생성.
const app = express()
//포트번호 3000번으로 설정.
const port = 5000;
const bP = require('body-parser');
const cP = require('cookie-parser');
// 몽고디비 아이디, 비밀번호 정보
const config = require("./config/key");

// 유저 스키마
const {User} = require("./models/User");
const {auth} = require('./middleware/auth');


// 애플리케이션. x-www-form-urlencoded
app.use(bP.urlencoded({extended: true}));
// 애플리케이션. json
app.use(bP.json());
// 애플리케이션/ 쿠키파서
app.use(cP());

//몽구스 모듈 가져오기. 몽구수는 몽고db를 편하게 사용할수 있는 툴
const mongoose = require('mongoose')
//클라우드에 있는 몽고db에 연결
// mongoose.connect("mongodb+srv://siwoopak:spat0726@boilerplate.gnbzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
// }).then(() => console.log('MongoDB Connected...')).catch(err => console.log('err'))

//클라우드에 있는 몽고db 연결 비밀설정 관리
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log('err'))


//Main
app.get('/', (req, res) => {
  res.send('Hello World! Nodemon start~')
})

app.get('/api/hello', (req,res) => {
   res.send('안녕하세요!'); 
})

//Register
app.post('/api/users/register', (req, res) =>{

    //register's information from client
    //this information save db
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    });

})
//end register

//login
app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }

        //요청된 이메일이 있다면, 비밀번호가 같은지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({loginSuccess: false, message:"Wrong password."})
            }
            
            //비밀번호까지 맞다면 토큰을 생성.
            user.genToken((err, user) => {
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 로컬? 쿠키?
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })

        })
    })

})
//end login

//Auth
app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과했다는 인증을 통과했다는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})
// end Auth

//Logout
app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id: req.user._id},
    {token : ""}
    , (err, user) => {
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


