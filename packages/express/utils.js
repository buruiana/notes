const DATA_TYPES = require('./constants')
const Post = require('./models/Post')
const Comment = require('./models/Comment')
const Keyword = require('./models/Keyword')
const Like = require('./models/Like')
const Feature = require('./models/Feature')
const Category = require('./models/Category')

const getModel = (model, info) => {
  switch (model) {
    case 'post':
      return new Post(info)
      break
    case 'comment':
      return new Comment(info)
      break
    case 'keyword':
      return new Keyword(info)
      break
    case 'like':
      return new Like(info)
      break
    case 'feature':
      return new Feature(info)
      break
    case 'category':
      return new Category(info)
      break
    default:
      break
  }
}

const getMod = (model) => {
  switch (model) {
    case 'post':
      return Post
      break
    case 'comment':
      return Comment
      break
    case 'keyword':
      return Keyword
      break
    case 'like':
      return Like
      break
    case 'feature':
      return Feature
      break
    case 'category':
      return Category
      break
    default:
      break
  }
}

module.exports.getModel = getModel
module.exports.getMod = getMod
