const { Movie } = require('../models');

class MoviesController {
  static list(req, res) {
    Movie.findAll({ where: { UserId: req.userId } })
      .then((movies) => {
        res.status(200).json({ success: true, data: movies });
      })
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ success: false, error: err.message || err });
      });
  }

  static post(req, res) {
    const { name, desc } = req.body;

    Movie.create({ name, desc, UserId: req.userId })
      .then((movie) => {
        res.status(201).json({ success: true, data: movie });
      })
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ success: false, error: err.message || err });
      });
  }

  static get(req, res) {
    const { id } = req.params;

    res.status(200).json({ success: true, data: req.movie })
  }

  static put(req, res) {
    const { id } = req.params;
    const { name, desc } = req.body;
    const { movie } = req

    movie.name = name
    movie.desc = desc

    movie
      .save()
      .then((_) => {
        res.status(200).json({ success: true, data: movie })
      })
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ success: false, error: err.message || err });
      });
  }

  static delete(req, res) {
    const { id } = req.params;
    const { movie } = req

    movie
      .destroy()
      .then((_) => {
        res.status(200).json({ message: "Movie deleted successfully!" })
      })
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ success: false, message: err.message || err });
      });
  }
}

module.exports = MoviesController;
