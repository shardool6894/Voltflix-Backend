const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please enter a valid email')
        }
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 6 characters long"],
      select: false,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Please enter a strong password')
        }
      }
    },
    role: {
      type: String,
      enum: ["driver", "admin"],
      default: "driver",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }
    else {
      const password = this.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      this.password = hashedPassword;
      return;
    }
  }
  catch (err) {
    return err;
  }
})

userSchema.methods.comparePassword = async function (password) {
  const isCorrectPassword = await bcrypt.compare(password, this.password)
  return isCorrectPassword;
}

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.signAuthToken = function () {
  return jwt.sign({
    id: this._id,
    email: this.email,
    role: this.role
  }, process.env.JWT_Secret, {
    expiresIn: '15m'
  })
}

userSchema.methods.signRefreshToken = function () {
  return jwt.sign({
    id: this._id,
    role: this.role
  }, process.env.JWT_Refresh_Secret, {
    expiresIn: '7d'
  })
}

userSchema.methods.checkRole = function (role) {
  return (this.role === role);
}

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).select('+password');
}

const userModel = mongoose.model('users', userSchema)
module.exports = { userModel }