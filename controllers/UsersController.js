const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class UsersController {
  static register(req, res) {
    const { email, password } = req.body;

    User.create({ email, password })
      .then((user) => {
        res
          .status(201)
          .json({ success: true, message: 'User registered successfully!' });
      })
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ success: false, error: err.message || err });
      });
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // generate access Token, balikin
          const payload = {
            id: user.id
          }
          const access_token = jwt.sign(payload, process.env.JWT_SECRET)
          res.status(200).json({ success: true, access_token });
        } else {
          throw {
            code: 401,
            message: 'Kombinasi email dan password tidak ditemukan!',
          };
        }
      })
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ success: false, error: err.message || err });
      });
  }
}

module.exports = UsersController;
