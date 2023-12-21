import WebSocket from 'ws';
import { collaborationRoomSockets } from '../rooms/collaboration-room'; // Updated import

export const participantSockets = new Map<string, WebSocket>();

export const addParticipant = (userId: string, ws: WebSocket, room: string) => {
  participantSockets.set(userId, ws);

  // Store the WebSocket connection in the respective room Map
  if (!collaborationRoomSockets.has(room)) {
    collaborationRoomSockets.set(room, new Set());

    console.log('Added participant to collaboration room:', { userId, room });
  }
  collaborationRoomSockets.get(room)?.add(ws);
};

export const removeParticipant = (userId: string) => {
  participantSockets.delete(userId);
};
