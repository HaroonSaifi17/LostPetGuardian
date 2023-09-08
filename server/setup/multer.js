const multer = require('multer')
const fs = require('fs')
let name

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './files/pdf')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    name = file.fieldname + '-' + uniqueSuffix + ext
    cb(null, name)
  },
})

const upload = multer({ storage: storage })
module.exports={upload,name}
