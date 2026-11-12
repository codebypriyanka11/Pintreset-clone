var express = require('express');
var router = express.Router();
const postModel = require ("./post");
const userModel = require ("./users");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser', async function(req, res, next) {
 let createduser = await userModel.create({
    username: "Priyanka",
    password: "Priyanka",
    posts: [ ],
    email: "priyanka@example.com",
    fullName: "Priyanka Raghochatan",
 })
 res.send(createduser);
});

router.get('/createpost', async function(req, res, next) {
  let createdpost = await  postModel.create({
     postText:"hello everyone kasa ho aap sab",
    user:"6af49e943784bdb4390331d1"
  });
  // res.send(createdpost);
  let user = await userModel.findOne({_id:"6af49e943784bdb4390331d1"});
  user.posts.push(createdpost._id);
  await user.save();
  res.send(createdpost);
 
});
module.exports = router;
