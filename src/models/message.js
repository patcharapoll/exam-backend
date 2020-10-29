import mongoose, {
    Schema,
  } from 'mongoose'

  const MessageSchema = new Schema({
    id: {
      type: String,
    },
    body: {
      type: String,
    },
    image: {
      type: String,
    },
    from: {
      type: String,
    },
    roomName: {
      type: String,
      default: new Date(),
    },
    timestamp: {
      type: String,
      default: new Date(),
    }
  }, {
    timestamps: true,
  })
  
export default mongoose.model('Message', MessageSchema)
  
  