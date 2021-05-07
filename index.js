//express 모듈을 가져옴.
const express = require('express')
//express함수로 app을 생성.
const app = express()
//포트번호 3000번으로 설정.
const port = 3000
const bP = require('body-parser');

const config = require("./config/key");

const {User} = require("./models/User");

app.use(bP.urlencoded({extended: true}));

app.use(bP.json());

//몽구스 모듈 가져오기. 몽구수는 몽고db를 편하게 사용할수 있는 툴
const mongoose = require('mongoose')
//클라우드에 있는 몽고db에 연결
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log('err'))

//Main
app.get('/', (req, res) => {
  res.send('Hello World! Nodemon start~')
})

//Register
app.post('/register', (req, res) =>{

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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


