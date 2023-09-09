const mongoose = require('mongoose')

const lostPetReportSchema = new mongoose.Schema({
  petName: String,
  category: String,
  color: String,
  description: String,
  contactName: String,
  contactEmail: String,
  contactPhone: Number,
  location: { lat: Number, lng: Number },
  dateLost: String,
  isFound: Boolean,
  foundDate: String,
  image: String,
})

const LostPetReport = mongoose.model('LostPetReport', lostPetReportSchema)

module.exports = LostPetReport
