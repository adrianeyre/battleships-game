import IMessage from './message';

export default interface IDataProps {
  handleData(message: IMessage): void;
  handleMessageReceived(): void;
  id: string;
  name: string;
}
