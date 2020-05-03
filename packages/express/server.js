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

app.post('/api/totalsByCategory', async (req, res) => {
  const model = getMod('post')

  model
    .aggregate([
      {
        $group: {
          _id: { category: '$category', subcategory: '$subcategory' },
          num: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.category',
          bySubCatCount: {
            $push: { subcategory: '$_id.subcategory', count: '$num' },
          },
        },
      },
      {
        $project: {
          _id: 1,
          bySubCatCount: 1,
          byCatCount: {
            $sum: '$bySubCatCount.count',
          },
        },
      },
    ])
    .exec((error, collection) =>
      error
        ? res.status(500).send(error)
        : res.status(200).json({
            collection,
          }),
    )
})

app.post('/api/read', async (req, res) => {
  if (!req.body.info) req.body.info = {}
  const {
    modelType,
    info: { limit = 0, skip = 0, sort = { datetime: -1 } },
    query,
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

app.post('/api/search', async (req, res) => {
  const { modelType, info } = req.body
  const model = getMod(modelType)

  model
    .find({
      $or: [
        { title: { $regex: info.search, $options: 'i' } },
        { longDescription: { $regex: info.search, $options: 'i' } },
        { content: { $regex: info.search, $options: 'i' } },
      ],
    })
    .sort({ datetime: -1 })
    .exec((error, collection) =>
      error
        ? res.status(500).send(error)
        : res.status(200).json({
            collection,
          }),
    )
})

app.post('/api/create', async (req, res) => {
  const { modelType, info } = req.body
  const model = getModel(modelType, info)

  model.save((error, result) =>
    error ? res.status(500).send(error) : res.json(result),
  )
})

app.post('/api/update', async (req, res) => {
  const { modelType, info, query } = req.body
  const model = getMod(modelType)

  model.findByIdAndUpdate(query, info, (error, result) => {
    error
      ? res.json({ success: false, error })
      : res.json({ success: true, result })
  })
})

app.post('/api/deleteOne', async (req, res) => {
  const { modelType, query } = req.body
  const model = getMod(modelType)

  model.deleteOne(query, (error, result) =>
    error ? res.status(500).send(error) : res.json({ success: true }),
  )
})

app.post('/api/deleteMany', async (req, res) => {
  const { modelType, query } = req.body
  const model = getMod(modelType)

  model.deleteMany(query, (error, result) =>
    error ? res.status(500).send(error) : res.json({ success: true }),
  )
})

const port = process.env.PORT || 3002
server.listen(port)

console.log('App is listening on port ' + port)
