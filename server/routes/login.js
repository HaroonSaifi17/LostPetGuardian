const passport = require('passport')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

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
  '/local',
  passport.authenticate('local',{session:false}),(req,res)=>{
   try {
      const token = jwt.sign({userId:req.user.id, userEmail:req.user.email },process.env.JWT_ADMIN_SECRET,{
      expiresIn: '10h' 
    })
      res.send({token:token}).end();
   } catch (error) {
    res.status(401).send(error).end()
   }
  }
)
module.exports = router
