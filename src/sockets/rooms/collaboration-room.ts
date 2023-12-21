import WebSocket from 'ws';

export const collaborationRoomSockets = new Map<string, Set<WebSocket>>();
