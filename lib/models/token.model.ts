import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  refresh_token: { type: String },
  created_at: { type: Date, default: Date.now },
})

const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema)

export default Token