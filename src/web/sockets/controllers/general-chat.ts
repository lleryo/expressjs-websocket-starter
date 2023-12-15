import { Package } from '../../../models/packages';
import { WebSocket } from 'ws';
import { chatRoomSockets, participantSockets } from '../manager';

export const handleGeneralChat = async (
  chatId: string,
  userId: string,
  message: string
) => {
  try {
    console.log('chatId, userId, data.message', chatId, userId, message);
    const packageWithChat = await Package.findOne({ pageId: chatId });
    console.log('packageWithChat', packageWithChat);

    const packageName = chatId?.split('/').pop();
    console.log('packageName', packageName);

    if (!packageWithChat) {
      const updatedPackage = await Package.findOneAndUpdate(
        { 'metaData.packageName': packageName },
        { $set: { pageId: chatId } },
        { new: true }
      );

      console.log('updatedPackage', updatedPackage);

      if (updatedPackage) {
        console.log('ChatId updated successfully:', updatedPackage);
        handleSendMessageToChatRoom(chatId, userId, new Date(), {
          type: 'general chat',
          message: `User ${userId} has joined the general chat.`,
        });
      } else {
        console.log('Package not found or chatId already exists:', chatId);
      }
    } else {
      console.log('Package with chatId already exists:', chatId);
      const timestamp = new Date();
      packageWithChat.realtime?.chat.push({
        userId,
        message,
        timestamp,
      });
      await packageWithChat.save();
      handleSendMessageToChatRoom(chatId, userId, timestamp, {
        type: 'general chat',
        message,
      });
    }
  } catch (error) {
    console.error('Error handling general chat:', error);
  }
};

const handleSendMessageToChatRoom = async (
  chatId: string,
  userId: string,
  timestamp: Date,
  data: { type: string; message: string }
) => {
  try {
    if (chatRoomSockets.has(chatId)) {
      chatRoomSockets.get(chatId)?.forEach((ws) => {
        const obj = {
          userId,
          timestamp,
          type: data.type,
          message: data.message,
        };
        ws.send(JSON.stringify(obj));
      });
    }
  } catch (error) {
    console.error('Error sending data to chat room participants:', error);
  }
};
