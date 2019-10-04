const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey



module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload);
      //通过id获取用户
      User.findById(jwt_payload.id)
        //获取成功
        .then(user => {
          //如果用户存在
          if (user) {
            return done(null, user);
          }
          //如果用户不存在
          return done(full, false);
        })
        //获取失败
        .catch(err => console.log(err));
    })
  );
};