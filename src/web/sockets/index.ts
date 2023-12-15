import WebSocket from 'ws';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { handleGeneralChat } from './controllers/general-chat';
import { handleBroadcastChat } from './controllers/broadcast-chat';
import { addParticipant, chatRoomSockets, removeParticipant } from './manager';

export const WebSocketServerConnection = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket, req: any) => {
    const urlParams = new URLSearchParams(req.url?.split('?')[1]);
    const chatId = urlParams.get('chatId');
    const userId = urlParams.get('userId');

    if (!chatId || !userId) {
      // Close the WebSocket connection if chatId or userId is missing
      console.log('Connection closed: No Chat ID | No User ID');
      ws.close();
      return;
    }

    console.log('URL Params: ', { chatId, userId });

    // Store the WebSocket connection in the chatRoomSockets Map
    if (!chatRoomSockets.has(chatId)) {
      chatRoomSockets.set(chatId, new Set());
    }
    chatRoomSockets.get(chatId)?.add(ws);

    addParticipant(userId, ws);

    // Handle incoming messages and WebSocket close events
    ws.on('message', (message: string) => {
      const data = JSON.parse(message);
      console.log(data);

      switch (data.type) {
        case 'general chat':
          handleGeneralChat(chatId, userId, data.message);
          break;
        case 'broadcast chat':
          handleBroadcastChat(chatId, userId, data.message);
          break;
        // ...
      }
    });

    ws.on('close', () => {
      removeParticipant(userId);
    });
  });
};
