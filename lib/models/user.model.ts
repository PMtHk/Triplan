import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Salt rounds for bcrypt
const saltRounds = 10

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  kakao_id: { type: String, required: false, default: null },
  username: { type: String, required: true },
  name: { type: String, required: false, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '' },
  image_url: { type: String, default: '' },
  onboarded: { type: Boolean, default: false },
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
  ],
  created_at: { type: Date, default: Date.now },
})

// Mongoose middleware
// Before save
userSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password' || user.password === '')) return next()
  else {
    bcrypt.genSalt(saltRounds, function (error: any, salt) {
      if (error) return next(error)

      bcrypt.hash(user.password, salt, function (error: any, hash) {
        if (error) return next(error)

        user.password = hash
        next()
      })
    })
  }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
