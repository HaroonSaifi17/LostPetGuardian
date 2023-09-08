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
  upload1.single('image'),
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
      const fileUrl = req.params.url
      const filePath = path.join(__dirname, '../images/', fileUrl)
      res.sendFile(filePath)
    } catch (error) {
      res.status(401).send(error.message).end()
    }
  }
)

router.get(
  '/reports',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0
      const limit = parseInt(req.query.limit) || 10
      const search = req.query.search || ''
      let sort = parseInt(req.query.sort) || -1
      let genre = req.query.cat || 'All'
      let pageno = [1]
      const genreOptions = ['cat', 'dog', 'rabbit', 'horses']

      let query = LostPetReport.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      })

      if (genre === 'All') {
        query = query
          .sort({ date: sort })
          .skip(page * limit)
          .limit(limit)
      } else {
        query = query
          .where('category')
          .in(genre)
          .sort({ date: sort })
          .skip(page * limit)
          .limit(limit)
      }

      const reports = await query.exec()
      const total = await LostPetReport.countDocuments({
        category: { $in: [...genre] },
        description: { $regex: search, $options: 'i' },
      })

      let totalpage = total / limit
      if (totalpage > 1) {
        for (let i = 1; i < totalpage; i++) {
          pageno.push(i + 1)
        }
      }
      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        reports,
        pageno,
        genreOptions,
      }
      res.status(200).json(response)
    } catch (error) {
      res.status(401).send(error.message).end()
    }
  }
)

module.exports = router
