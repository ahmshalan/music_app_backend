const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthday = new Date(req.body.birthday);
  const gender = req.body.gender;
  //   const picture = req.body.picture;
  const country = req.body.country;

  const diff_ms = Date.now() - birthday.getTime();
  const age_dt = new Date(diff_ms);
  const age = Math.abs(age_dt.getUTCFullYear() - 1970);

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        gender: gender,
        // picture: picture,
        country: country,
        is_kid: age < 18 ? true : false,
      });
      return user.save();
    })
    .then((result) =>
      res.status(201).json({ message: "User Created!", userId: result._id })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statuscode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A User with thi email could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt(
        {
          email: loadedUser.email,
          userId: loadedUser.userId.toString(),
        },
        "secret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statuscode = 500;
      }
      next(err);
    });
};
