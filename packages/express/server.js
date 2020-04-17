const express = require('express')
const http = require('http')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const fs = require('fs')
const cors = require('cors')
const { getModel, getMod } = require('./utils')

require('dotenv').config()

const app = express()
app.use(cors())

app.use(bodyParser.json({ limit: '100mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

const server = http.createServer(app)

const mongo_uri = 'mongodb://localhost/tips'

mongoose.connect(
  mongo_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) =>
    error ? error : console.log(`Successfully connected to ${mongo_uri}`),
)

app.post('/api/read', async (req, res) => {
  const {
    modelType,
    info: { limit, skip, sort, query },
  } = req.body

  const model = getMod(modelType)

  const getCollection = (total) =>
    model
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec((error, collection) =>
        error
          ? res.status(500).send(error)
          : res.status(200).json({
              total,
              collection,
            }),
      )

  model
    .countDocuments(query)
    .exec((error, count) =>
      error ? res.status(500).send(error) : getCollection(count),
    )
})

app.post('/api/create', async (req, res) => {
  const { modelType, info } = req.body
  const model = getModel(modelType, info)

  model.save((error) => (error ? res.status(500).send(error) : res.json(model)))
})

app.post('/api/update', async (req, res) => {
  const { modelType, info } = req.body
  const model = getMod(modelType, info)

  model.findByIdAndUpdate(info._id, info, (error) => {
    error ? res.json({ success: false, error }) : res.json({ success: true })
  })
})

app.delete('/api/delete', async (req, res) => {
  const { modelType, info } = req.body

  const model = getMod(modelType, info)
  var myquery = { _id: req.body.info }
  model.deleteOne(myquery, function (error, obj) {
    error ? res.status(500).send(error) : res.json('delete success')
  })
})

const port = process.env.PORT || 3002
server.listen(port)

console.log('App is listening on port ' + port)
