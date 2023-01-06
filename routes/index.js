var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const validator = require('validator')
const { mongodb, dbname, dburl } = require('../public/dbconfig/DB')
const { userModel } = require('../public/dbconfig/Schema/userSchema')
const { hashPassword, validate, Createtoken, Decodetoken, Tokenvalidate } = require('../public/dbconfig/bcrypt');
const {generateEmail } = require('../public/utlis/Emailutli');
const app = require('../app');
const shortid = require('shortid');
const { reset } = require('nodemon');
const nodemailer =require('nodemailer');
mongoose.connect(dburl)
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/Signup', async (req, res) => {
  try {
    let user = await userModel.findOne({ Email: req.body.Email })
    if (!user) {
      req.body.Password = await hashPassword(req.body.Password)
      let user = await userModel.create(req.body)
      res.status(201).send(`User Registration Successfull`)
    }
    else {
      res.status(400).send(`User with ${req.body.Email} is Already exists`)
    }
  }
  catch (error) {
    res.status(500).send({ message: `Internal server error ${error}` })
  }
})
router.get('/All', Tokenvalidate, async (req, res) => {
  try {
    let user = await userModel.find()
    res.status(201).send({ data: user })
  }
  catch (error) {
    res.status(500).send({ message: "Internal server error", error })
  }
})

router.post('/Signin', async (req, res) => {
  try {
    let user = await userModel.findOne({ Email: req.body.Email })
    if (user) {
      if (await validate(req.body.Password, user.Password)) {
        let token = await Createtoken({
          Email: user.Email,
          Username:user.Username,
          Password: user.Password,
          Mobile: user.Mobile,
        })
        Decodetoken(token)
        res.status(200).send({ message: "login Sucessfull"})
        
      }
    
    else {
      res.status(400).send({message:"Incorrect password"})
    }}
    else{
           res.status(401).send({message:"Email id doesn't exist"})
    }
  }
  catch(error) {
    res.status(500).send({ message: "Internal server error", error })
  }
})
router.post('/reset-password', async (req, res) => {
  try {
    let existinguser = await userModel.findOne({ Email: req.body.Email })
    if (existinguser) {
      var auth = shortid.generate()
     
      let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
          user: "vatchans@gmail.com",
          pass: "D2FDE1C28195576B0F29660C3D3D60467FBB",
        },
      });
      let info = await transporter.sendMail({
        from: 'vatchans@gmail.com',
        to: req.body.Email,
        subject: "Password reset Link", 
        html:generateEmail(auth)
        , 
      });
      
      let existinguser = await userModel.updateOne({ Email: req.body.Email }, {
        $set: {
          Auth: auth
        }
      })
      res.status(200).send({message:"Reset Link sent",auth}
      )
      console.log(auth)
    }
    else {
      res.status(400).send({message:"Wrong Email address"})
    }

  }
  catch (error) {
    res.status(500).send({message:"internal server error"})
  }
})
router.post('/Autenticate-code', async (req, res) => {
  try {
    let existinguser = await userModel.findOne({ Auth: req.body.code })


    if (existinguser) {
      res.status(200).send({message:"Authorization Success"})
    }
    else {
      res.status(401).send({message:"Authorization failed you have entered wrong code"})
    }
  }

  catch (error) {
    res.status(500).send("internal server error")
  }
})
router.post("/new-password/:Email/", async (req, res) => {
  try {
    let hash= await hashPassword(req.body.Password)
    let newpassword = await userModel.updateOne({ Email: req.params.Email }, { $set: { Password:hash} })
    await userModel.updateOne({Email:req.params.Email},{$unset:{Auth:""}})
    res.status(200).send("Password reseted sucessfully")
 
  }
  catch (error) {
    res.status(500).send('err')
  }
})
module.exports = router;

