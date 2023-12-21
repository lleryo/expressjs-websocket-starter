import WebSocket from 'ws';

export const chatRoomSockets = new Map<string, Set<WebSocket>>();
