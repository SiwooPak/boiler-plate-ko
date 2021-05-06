//express 모듈을 가져옴.
const express = require('express')
//express함수로 app을 생성.
const app = express()
//포트번호 3000번으로 설정.
const port = 3000

//몽구스 모듈 가져오기. 몽구수는 몽고db를 편하게 사용할수 있는 툴
const mongoose = require('mongoose')
//클라우드에 있는 몽고db에 연결
mongoose.connect("mongodb+srv://siwoopak:spat0726@boilerplate.gnbzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log('err'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


