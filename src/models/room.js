import mongoose, {
    Schema,
} from 'mongoose'
  
  const RoomSchema = new Schema({
    roomName: {
      type: String,
    },
    message: {
      type: Array,
    },
  }, {
    timestamps: true,
  })
  
export default mongoose.model('Room', RoomSchema)
  
  