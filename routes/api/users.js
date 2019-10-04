//login & register
const express = require("express");
//实例化路由
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

//验证路由,访问/test，将返回`msg:"login works"
// router.get("/test", (req, res) => {
//     res.json({ msg: "login works"})
// })

// $route POST api/users/register
// @desc  返回的请求的JSON数据
// @access public
router.post("/register", (req, res) => {
  //console.log(req.body)

  //查询数据库中是否存在邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //如果user存在,返回判断
      return res.status(400).json("邮箱已被注册!");
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      //s是大小。r是头像格式。mm是默认头像

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity
      });

      bcrypt.genSalt(10, function(err, salt) {
        //10是加密的一种模式
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //newUser.password 是加密对象，salt是回调函数，最后是加密结果
          if (err) throw err; //如果存在错误，则抛出。 throw是js语法，抛出
          //没有错误，则
          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// $route POST api/users/register
// @desc  返回token jwt(json web token) passport
// @access public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //查询数据库
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json("用户不存在!");
    }

    //如果存在,密码匹配
    //第一个password是前端传入密码，user.password是系统内密码
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity
        }; //可以更多
        //jwt.sign("规则","加密名字","过期时间","箭头函数")
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
        //   res.json({ msg: "success" }); //如果密码对比正确
      } else {
        return res.status(400).json("密码错误！");
        //如果密码对比不正确
      }
    });
  });
});

//完成token验证，返回部分信息
//$route GET api/users/current
//@desc return current user
//@access Privates
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity
    });
  }
);

module.exports = router;
