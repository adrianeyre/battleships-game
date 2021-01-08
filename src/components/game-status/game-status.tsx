import React, { FC, useState } from 'react';
import moment from 'moment';

import IGameStatusProps from './interfaces/game-status-props'
import IMessage from '../../services/interfaces/message';

import './styles/game-status.scss';

const GameStatus: FC<IGameStatusProps> = (props: IGameStatusProps) => {
	const [chatMessage, setChatMessage] = useState<string>('');

	const styleGameStatus = () => ({
		marginLeft: `${ (props.containerWidth / 2) + (props.spriteWidth / 2) }px`,
		height: `${ props.containerWidth }px`,
	})

	const styleTextColour = (color: string) => ({ color });

	const handleChatMessage = (event: any) => {
		const chatMessage = event.target.value;

		setChatMessage(chatMessage);
	}

	const handleSendMessage = () => {
		props.handleSendMessage(chatMessage);
		setChatMessage('');
	}

	return <div className="game-status" style={ styleGameStatus() }>
		<div className="status-title">Game Status</div>
		<div className="status">
			{ props.messages.map((message: IMessage, messageIndex: number) => 
				<div key={ `message-${ messageIndex }`} className="status-message">
					[{ moment(message.dateTime).format("HH:mm") }]
					<span style={ styleTextColour(message.colour) } > { message.message }</span>
				</div>
			)}
		</div>
		<div className="chat-input">
			<input type="text" name="chat" value={ chatMessage } onChange={ handleChatMessage } />
			<input type="submit" value="Send" onClick={ handleSendMessage }/>
		</div>
	</div>
}

export default GameStatus;
