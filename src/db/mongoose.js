const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manage-api");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  password: {
    type: String,
    require: true,
    minLength: [6, "password too short"],
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Pasword can't contain 'password'");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive number");
      }
    },
  },
});

const me = new User({
  name: "Kristo",
  email: "JUBELSINAGA@OUTLOOK.COM",
  password: "passowrd123",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log(error);
  });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const learn = new Task({ description: "Learn Machine Learning" });

// learn
//   .save()
//   .then(() => {
//     console.log(learn);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
