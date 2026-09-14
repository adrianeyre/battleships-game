import { io, Socket } from 'socket.io-client';

import IData from './interfaces/data';
import IDataProps from './interfaces/data-props';
import IMessage from './interfaces/message';
import MessageActionEnum from './enums/message-action-enum';

const CHANNEL = 'battle-ships-data';

export default class Data implements IData {
  public messages: IMessage[];
  public handleData: (message: IMessage) => void;
  public handleMessageReceived: () => void;
  public id: string;
  public name: string;

  private socket: Socket;
  // Vite replaces this at build time, so the server is baked into the bundle.
  private readonly END_POINT: string | undefined = import.meta.env.VITE_SERVER;

  constructor(config: IDataProps) {
    this.messages = [];
    this.handleData = config.handleData;
    this.handleMessageReceived = config.handleMessageReceived;
    this.id = config.id;
    this.name = config.name;

    if (!this.END_POINT) throw Error('VITE_SERVER needs setting in your environment!');
    this.socket = io(this.END_POINT);
    this.socket.on(CHANNEL, (message: IMessage) => this.handleMessage(message));
  }

  public sendMessage = (message: IMessage): void => {
    this.socket.emit(CHANNEL, message);
  };

  private handleMessage = (message: IMessage): void => {
    this.handleMessageReceived();

    switch (message.action) {
      case MessageActionEnum.FIRE:
      case MessageActionEnum.HIT:
      case MessageActionEnum.MISS:
      case MessageActionEnum.GAME_OVER:
      case MessageActionEnum.LOGOUT:
      case MessageActionEnum.SUNK:
      case MessageActionEnum.START_GAME:
        this.handleData(message);
        break;
      case MessageActionEnum.CHECK:
        return this.checkIn();
    }

    this.addMessage(message);
  };

  private addMessage = (message: IMessage) => this.messages.unshift({ ...message });

  private checkIn = (): void => {
    this.sendMessage({
      action: MessageActionEnum.RESPOND,
      id: this.id,
      name: this.name,
      message: '',
      colour: '',
    });
  };
}
