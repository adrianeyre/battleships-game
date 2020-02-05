import React from 'react';

import IGameStatusProps from './interfaces/game-status-props'
import IGameStatusState from './interfaces/game-status-state'

import './styles/game-status.scss';

export default class GameStatus extends React.Component<IGameStatusProps, IGameStatusState> {
	constructor(props: IGameStatusProps) {
		super(props);

		this.state = {
			chatMessage: '',
		}
	}

	public render() {
		return <div className="game-status" style={ this.styleGameStatus() }>
			<div className="status-title">Game Status</div>
			<div className="status">
				{ this.props.messages.map((message: string, messageIndex: number) => 
					<div className="status-message" key={ `message-${ messageIndex }`}>{ message }</div>
				)}
			</div>
			<div className="chat-input">
				<input type="text" name="chat" value={ this.state.chatMessage } onChange={ this.handleChatMessage } />
				<input type="submit" value="Send" onClick={ this.handleSendMessage }/>
			</div>
		</div>
	}

	private styleGameStatus = () => ({
		marginLeft: `${ (this.props.containerWidth / 2) + (this.props.spriteWidth / 2) }px`,
		height: `${ this.props.containerWidth }px`,
	})

	private handleChatMessage = (event: any) => {
		const chatMessage = event.target.value;

		this.setState(() => ({ chatMessage }))
	}

	private handleSendMessage = async () => {
		this.props.handleSendMessage(this.state.chatMessage);
		await this.setState(() => ({ chatMessage: '' }));
	}
}
