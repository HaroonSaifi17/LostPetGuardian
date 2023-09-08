const express = require('express')
const cors = require('cors')
require('dotenv').config()

const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
require('./setup/mongoose')
require('./setup/passport')

app.use('/login',loginRouter)
app.use('/user',userRouter)

app.listen(process.env.PORT || port, () => {
  console.log(`Server is listening at http://localhost:${port} `)
})
