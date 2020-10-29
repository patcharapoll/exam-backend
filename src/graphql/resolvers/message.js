import get from 'lodash/get';
import uuid from 'uuid/v1';
import RoomModel from '../../models/room'
import SenderModel from '../../models/sender'
import MessageModel from '../../models/message'
import { pubsub } from '../pubsub'

import '../../connections/mongo'
const NEW_MESSAGE = 'NEW_MESSAGE';

export default {
  Query: {
    messages: async (_, { roomName }) => {
      const messages = await MessageModel.find({ roomName })
      console.log('Message: ', roomName, messages)
      return messages
    },
    room: async (_, {}) => {
      const rooms = await RoomModel.find({})
      console.log('Room: ', rooms)
      return rooms
    },
    sender: async (_, {}) => {
      const senders = await SenderModel.find({})
      console.log('Sender: ', senders)
      return senders
    }
  },
  Mutation: {
    sendMessage: async (_, { body, image, from, timestamp, roomName }) => {
      const message = new MessageModel({ body, image, from, timestamp, roomName })
      await message.save()
      pubsub.publish(NEW_MESSAGE, { newMessage: message })
      return { successful: true }
    },
    createSender: async (_, { name }) => {
      const hadSender = await SenderModel.findOne({ name })
      if (!hadSender) {
        const sender = new SenderModel({ name })
        await sender.save()
        return sender
      }
    },
    createRoom: async (_, { roomName }) => {
      const hadRoom = await RoomModel.findOne({ roomName })
      if (!hadRoom) {
        const room = new RoomModel({ roomName })
        await room.save()
        return { successful: true, roomName }
      }
      return { successful: false }
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE]),
    }
  }
};
