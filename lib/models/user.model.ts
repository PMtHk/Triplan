import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  kakao_id: { type: String, required: false, unique: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  image_url: { type: String, required: false },
  onboarded: { type: Boolean, default: false },
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
  ],
  created_at: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
