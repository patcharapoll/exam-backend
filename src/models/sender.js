import mongoose, {
    Schema,
  } from 'mongoose'
  
  const SenderSchema = new Schema({
    name: {
      type: String,
    },
  }, {
    timestamps: true,
  })
  
export default mongoose.model('Sender', SenderSchema)
  
  