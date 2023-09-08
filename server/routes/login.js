const passport = require('passport')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('./../models/user')

router.post(
  '/local',
passport.authenticate('local',{session:false}),
  (req,res)=>{
   try {
      const token = jwt.sign({userId:req.user.id, userEmail:req.user.email },process.env.JWT_SECRET,{
      expiresIn: '10h' 
    })
      res.send({token:token}).end();
   } catch (error) {
    res.status(401).send(error).end()
   }
  }
)

router.get(
  '/',
  passport.authenticate('google', { scope: ['email', 'profile'],session:false })
)

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session:false
  }),(req,res)=>{
   try {
      const token = jwt.sign({userId:req.user.id, userEmail:req.user.email },process.env.JWT_SECRET,{
      expiresIn: '10h' 
    })
      res.redirect(process.env.REDIRECT_URL + '?token=' + token);
   } catch (error) {
    res.status(401).send(error.message).end()
   }
  }
)
router.post(
  '/new',
  async (req,res)=>{
   try {
      let user= new User({
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
      })
      await user.save()
      const token = jwt.sign({userId:user._id.toString(), userEmail:user.email },process.env.JWT_SECRET,{
      expiresIn: '10h' 
    })
      res.send({token:token}).end();
   } catch (error) {
    res.status(401).send(error).end()
   }
  }
)

module.exports = router
