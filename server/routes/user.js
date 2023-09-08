const passport = require('passport')
const router = require('express').Router()
const User = require('./../models/user')
const LostPetReport = require('../models/pet')

const multer = require('multer')
const fs = require('fs')

const storage1 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length
    )
    let imgName = file.fieldname + '-' + uniqueSuffix + ext
    cb(null, imgName)
  },
})

const upload1 = multer({
  storage: storage1,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})
router.get(
  '/name',
  passport.authenticate('jwt', { session: false }),
  upload1.single('image'),
  async (req, res) => {
    try {
      let user = await User.findById(req.user.userId)
      res.send({ name: user.name }).end()
    } catch (error) {
      res.status(401).send(error).end()
    }
  }
)
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let user = await User.findById(req.user.userId)
      const lostPet = new LostPetReport({
        petName: req.body.name,
        image: req.file.filename,
        category: req.body.category,
        color: req.body.color,
        description: req.body.description,
        contactName: user.name,
        contactEmail: user.email,
        contactPhone: req.body.number,
        location: req.body.location,
        dateLost: new Date().toLocaleString(),
        isFound: false,
      })
      await lostPet.save()
      res.status(200).end()
    } catch (error) {
      res.status(401).send(error).end()
    }
  }
)
router.get(
  '/image/:url',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const fileUrl = req.params.url;
      const filePath = path.join(__dirname, '../images/', fileUrl);
      res.sendFile(filePath)
    } catch (error) {
      res.status(401).send(error.message).end()
    }
  }
)

module.exports = router
