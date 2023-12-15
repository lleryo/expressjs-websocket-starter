import { WebSocket } from "ws";
import { Broadcast } from "../../../models/broadcast";

export const handleBroadcastChat = async (chatId: string, userId: string, message: string) => {
  try {
    console.log('handleBroadcastChat');
    const broadcastRoom = await Broadcast.findOne({ chatId });
    if (broadcastRoom) {
      console.log('handleBroadcastChat => broadcastRoom');

      // Push the chat message and save the document
      const timestamp = new Date();
      broadcastRoom.chat.push({
        userId,
        message,
        timestamp,
      });
      await broadcastRoom.save();
      console.log('handleBroadcastChat => broadcastRoom => saved');

    //   sendDataToRoomParticipants(chatId, userId, timestamp, {
    //     type: 'chat',
    //     message,
    //   });
    }
  } catch (error) {
    console.error('Error handling chat message:', error);
  }
};

// export const sendDataToRoomParticipants = async (chatId: string, userId: string, timestamp: Date, data: { type: string; message: string }
// ) => {
//   try {
//     if (roomParticipants.has(chatId)) {
//       roomParticipants.get(chatId)?.forEach((participant) => {
//         console.log('PARTICIPANTS', roomParticipants);
//         // Get the WebSocket connection from the participantSockets Map using userId
//         const ws = participantSockets.get(participant || '');

//         if (ws instanceof WebSocket) {
//           // Check if the participant has a WebSocket connection
//           const obj = {
//             userId,
//             timestamp,
//             type: 'chat',
//             message: data.message,
//           };

//           ws.send(JSON.stringify(obj));
//         }
//       });
//     }
//   } catch (error) {
//     console.error('Error sending data to room participants:', error);
//   }
// };