const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//user정보를 저장하기전에 이쪽에서 먼저 처리
userSchema.pre('save', function(next){
    //user정보를 가져옴.
    var user = this;

    //password 변경시에만.
    if(user.isModified('password')) {
        //비밀번호를 암호화 시키는 작업
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                // Store hash in your password DB.
                user.password = hash
                console.log("Hashing password: ", user.password);
                next()
            })
        })
    } else {
        // 비밀번호 변경이 아닐 시 빠져나감.
        next()
    }
    
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.genToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //가져온 토큰을 복호화함.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져오 토큰과 디비에 보관된 토큰이 일치하는 확인

        user.findOne({"_id": decoded, "token": token}, 
        function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}
//User변수에 userSchema를 담음..
const User = mongoose.model('User',userSchema);
//다른 곳에서 이 스키마를 User라고 사용할 수 있게 설정.
module.exports = {User};