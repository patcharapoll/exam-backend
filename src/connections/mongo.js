import mongoose from 'mongoose'

require('dotenv').config()

const mongoConnection = process.env.MONGODB

mongoose.Promise = global.Promise

mongoose.connect(mongoConnection,  {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (e) => {
  console.log(e)
  process.exit(1)
})

db.once('open', () => {
  console.log('Database connected successfully')
})

export default db
