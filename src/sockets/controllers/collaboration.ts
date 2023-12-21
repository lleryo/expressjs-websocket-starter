// controllers/collaboration.ts

import WebSocket from 'ws';
import { collaborationRoomSockets } from '../rooms/collaboration-room';

export const handleCollaboration = (room: string, ws: WebSocket) => {
  // Add the current WebSocket connection to the collaboration room
  collaborationRoomSockets.get(room)?.add(ws);

  // Send a welcome message to the connected user
  // ws.send(
  //   JSON.stringify({
  //     type: 'message',
  //     content: 'Welcome to the collaboration room!',
  //   })
  // );

  // Broadcast a message to all connected users in the collaboration room
  // broadcastCollaborationMessage(
  //   room,
  //   'New user joined the collaboration room',
  //   ws // Pass 'ws' as an argument here
  // );

  // Handle incoming messages from the user
  ws.on('message', (message: string) => {
    const data = JSON.parse(message);
    console.log('data: ', data);

    console.log('Reached here');
    // Example: Broadcast the received text message to all connected users
    broadcastCollaborationMessage(room, data.content, ws);
  });

  // Handle WebSocket connection close
  ws.on('close', () => {
    // Remove the WebSocket connection from the collaboration room
    collaborationRoomSockets.get(room)?.delete(ws);

    // // Broadcast a message indicating that the user has left the collaboration room
    // broadcastCollaborationMessage(
    //   room,
    //   'User left the collaboration room',
    //   ws
    // );
  });
};

// Function to broadcast a collaboration message to all connected users in the room
const broadcastCollaborationMessage = (
  room: string,
  message: string,
  ws: WebSocket
) => {
  console.log('Will get below soon');

  const collaborationRoom = collaborationRoomSockets.get(room);

  if (collaborationRoom) {
    collaborationRoom.forEach((clientSocket) => {
      console.log('Just got here "collaborationRoomSockets"');

      if (clientSocket !== ws) {
        console.log('Valid WebSocket connection found');

        if (clientSocket.readyState === WebSocket.OPEN) {
          console.log('WebSocket connection is OPEN');

          const obj = {
            room,
            timestamp: new Date(),
            type: 'collaboration',
            message,
          };

          console.log('obj: ', obj);

          console.log('Sending message to clientSocket');
          clientSocket.send(JSON.stringify(obj));
        } else {
          console.log('WebSocket connection is not OPEN');
        }
      } else {
        console.log('Skipping the WebSocket that sent the message');
      }
    });
  } else {
    console.log('No collaboration room found for room:', room);
  }
};
