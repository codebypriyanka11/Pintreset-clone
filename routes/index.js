var express = require('express');
var router = express.Router();
const postModel = require ("./post");
const userModel = require ("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/alluserposts', async function(req, res, next) {
//  let user = await userModel
//  .findOne({_id:"6af49e943784bdb4390331d1"})
//  .populate("posts");
//  res.send(user);
// });

// router.get('/createuser', async function(req, res, next) {
//  let createduser = await userModel.create({
//     username: "Priyanka",
//     password: "Priyanka",
//     posts: [ ],
//     email: "priyanka@example.com",
//     fullName: "Priyanka Raghochatan",
//  })
//  res.send(createduser);
// });

// router.get('/createpost', async function(req, res, next) {
//   let createdpost = await  postModel.create({
//      postText:"hello everyone kasa ho aap sab",
//     user:"6af49e943784bdb4390331d1"
//   });
//   // res.send(createdpost);
//   let user = await userModel.findOne({_id:"6af49e943784bdb4390331d1"});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send(createdpost);
 
// });

router.get('/profile',isLoggedIn, function(req, res, next) {
 res.send("profile");
});

router.post('/register',function(req,res){
  const {username,email,fullname} = req.body;
  const userData = new userModel({username,email,fullname});
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
})

router.get("login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){
});

router.get("/logout",function(req,res){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  });
})

function isLoggedIn (req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/")
}


module.exports = router;
