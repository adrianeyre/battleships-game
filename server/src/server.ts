import { createServer, Server as HttpServer } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as dotenv from "dotenv";

import IServer from './interfaces/server';
import IMessage from './interfaces/message';
import IBattleShips from './interfaces/battle-ships';
import BattleShips from './battle-ships';

export default class Server implements IServer {
	private readonly PORT: number = 4000;
	private readonly timerInterval: number = 1000;

	private app: express.Application;
	private server: HttpServer;
	private io: SocketIO.Server;
	private port: string | number;
	private battleShips: IBattleShips;
	private timer: any;

	constructor() {
		dotenv.config();
		this.app = express();
		this.port = process.env.PORT || this.PORT;
		this.server = createServer(this.app);
		this.io = socketIo(this.server);
		this.battleShips = new BattleShips();
		this.timer = setInterval(this.myTimer, this.timerInterval);

		this.listen();
	}

	private listen(): void {
		this.server.listen(this.port, () => {
			console.log(`Server running on port ${ this.port }`);
		});

		this.io.on('connect', (socket: any) => {
			console.log(`Connected client on port ${ this.port }`);

			socket.on('battle-ships-data', (data: IMessage) => {
				const socketId = socket.id;
				const messages = this.battleShips.handle({ ...data, socketId: socketId });

				messages.forEach((message: IMessage) => this.io.to(message.socketId).emit('battle-ships-data', message));
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}

	private myTimer = () => {
		const messages = this.battleShips.checkIn();

		messages.forEach((message: IMessage) => this.io.to(message.socketId).emit('battle-ships-data', message));
	}
}