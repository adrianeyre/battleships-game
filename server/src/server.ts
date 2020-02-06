
import { createServer, Server as HttpServer } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import IServer from './interfaces/server';
import IData from './interfaces/data';

export default class Server implements IServer {
	private readonly PORT:number = 5000;
	private app: express.Application;
	private server: HttpServer;
	private io: SocketIO.Server;
	private port: string | number;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || this.PORT;
		this.server = createServer(this.app);
		this.io = socketIo(this.server);

		this.listen();
	}

	private listen(): void {
		this.server.listen(this.port, () => {
			console.log(`Server running on port ${ this.port }`);
		});

		this.io.on('connect', (socket: any) => {
			console.log(`Connected client on port ${ this.port }`);

			socket.on('battle-ships-data', (data: IData) => {
				console.log(`data: ${ JSON.stringify(data) }`);
				this.io.emit('battle-ships-data', {
					datetime: Date.now(),
					type: data.type,
					message: data.message,
				});
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}
}