import mongoose from 'mongoose'

let isConnected = false // Variable to check if mongoose is connected

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found in .env file')
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true
    console.log('Connected to MongoDB')
  } catch (error: any) {
    console.log(error)
  }
}

// Use it when necessary
export const disconnectFromDB = async () => {
  if (!isConnected) return;

  try {
    await mongoose.connection.close()
    isConnected = false
    console.log('Disconnected from MongoDB')
  } catch (error: any) {
    console.log(error)
  }
}
