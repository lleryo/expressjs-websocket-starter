import WebSocket from 'ws';
import { Server, IncomingMessage, ServerResponse } from 'http';
// import { handleGeneralChat } from './controllers/blog-general-chat';
import { handleCollaboration } from './controllers/collaboration';
import { addParticipant, removeParticipant } from './manager/collaboration';
// import { handleCursorTracking } from './controllers/cursor-tracking';

export const WebSocketServerConnection = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket, req: any) => {
    const urlParams = new URLSearchParams(req.url?.split('?')[1]);
    const feature = urlParams.get('feature'); // Updated variable name
    const userId = urlParams.get('userId');
    const draftId = urlParams.get('draftId');

    if (!feature || !userId) {
      // Close the WebSocket connection if feature or userId is missing
      console.log('Connection closed: No Feature | No User ID');
      ws.close();
      return;
    }

    console.log('URL Params: ', { feature, userId, draftId });

    // Handle different features based on the 'feature' parameter
    switch (feature) {
      case 'general-chat':
        // handleGeneralChat(userId, ws);
        break;
      case 'collaboration':
        // Add the user to the collaboration room
        addParticipant(userId, ws, String(draftId));
        handleCollaboration(String(draftId), ws);
        break;
      case 'cursor-tracking':
        // handleCursorTracking(userId, ws);

        break;
      // Add cases for other features as needed
      default:
        // Close the WebSocket connection if an unknown feature is provided
        console.log('Connection closed: Unknown Feature');
        ws.close();
    }

    ws.on('close', () => {
      removeParticipant(userId);
    });
  });
};
