import WebSocket from 'ws';

export const participantSockets = new Map<string, WebSocket>();

export const chatRoomSockets = new Map<string, Set<WebSocket>>();

export const addParticipant = (userId: string, ws: WebSocket) => {
  participantSockets.set(userId, ws);
};

export const removeParticipant = (userId: string) => {
  participantSockets.delete(userId);
};


