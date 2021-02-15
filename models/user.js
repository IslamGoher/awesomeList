// application requirements
const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `please add a name.`],
    minlength: [5, `name must be more than 5 characters.`],
    maxlength: [30, `name must be less than 30 characters.`]
  },
  email: {
    type: String,
    required: [true, `please add email.`],
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      `please add valid email.`]
  },
  password: {
    type: String,
    required: [true, `please add password.`]
  },
  lists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: `lists`
  }
});

// user model
const User = mongoose.model(`users`, userSchema);

module.exports = User;