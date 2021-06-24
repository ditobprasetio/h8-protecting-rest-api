const jwt = require('jsonwebtoken')
const { Movie } = require('../models')

const authentication = (req, res, next) => {
  if (!req.headers.access_token) return res.status(401).json({ success: false, message: "missing access_token" })

  try {
    const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  }
  catch (err) {
    res.status(401).json({ success: false, message: "invalid access_token" })
  }
}

const authorization = (req, res, next) => {
  const { id } = req.params

  Movie.findOne({
    where: {
      id: id, UserId: req.userId
    }
  })
    .then((movie) => {
      if (!movie) return res.status(404).json({ success: false, message: "Movie not found!" })

      req.movie = movie
      next()
    })
    .catch(err => [
      res.status(500).json({ success: false, message: err })
    ])
}
module.exports = { authentication, authorization }