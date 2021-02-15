// application requirements
const mongoose = require(`mongoose`);

let todoValidation = (arr) => {
  return Array.isArray(arr) && arr.length > 0
};

const listSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  title: {
    type: String,
    maxlength: [60, `title must be less than 30 characters.`]
  },
  todos: {
    type: [{
      description: {
        type: String,
        maxlength: [5000, `description must be less than 30 characters.`]
      },
      done: {
        type: Boolean,
        default: false
      }
    }],
    validate: [todoValidation, `please add todo.`]
  },
  user: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: `users`
  }
});

// list model
const List = mongoose.model(`lists`, listSchema);

module.exports = List;