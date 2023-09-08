const mongoose = require('mongoose')

mongoose
  .connect(process.env.BLOGDB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error)
  })
