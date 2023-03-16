import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
// need to set up mongo username and password to access DB
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
// add mongoDB connection string into application code
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.viddgku.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })