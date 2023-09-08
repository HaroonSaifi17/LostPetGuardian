const passport = require('passport')
const router = require('express').Router()
const User = require('./../models/user')

router.get(
  '/name',
passport.authenticate('jwt',{session:false}),
  async (req,res)=>{
   try {
      let user=  await User.findById(req.user.userId)
      res.send({name:user.name}).end();
   } catch (error) {
    res.status(401).send(error).end()
   }
  }
)

module.exports = router
