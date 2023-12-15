// src/server.ts
import { ConnectDatabase } from './lib/config/connect-db';
import Express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';

// import routes
import { ErrorHandler } from './middleware/error';
import { WebSocketServerConnection } from './web/sockets';

// Set port
const PORT = process.env.PORT || 6556;
const baseURL = `http://localhost:${PORT}`;


// Create an express instance
const app: Express.Application = Express();

// Websocket Server
// Create an instance of the HTTP server and store it in the 'server' variable
const server = http.createServer(app);
WebSocketServerConnection(server);

// Connection to our MongoDB.
ConnectDatabase();

// Middleware
app.use(morgan('dev'));
app.use(Express.json());
app.use(cookieParser());
app.use(helmet());
app.use(ErrorHandler);
app.use(Express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Application API Endpoints


// Port listening on 8000
server.listen(PORT, () => console.log(`Server is running on ${baseURL}`));
