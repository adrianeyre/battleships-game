import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';
import IInfoBoardState from './interfaces/info-board-state';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, IInfoBoardState> {
	constructor(props: IInfoBoardProps) {
		super(props);

		this.state = {
			playerName: '',
		}
	}

	public render() {
		return <div className="info-board" style={ this.styleInfoBoard() }>
			<div className="info-board-header">
				{/* <img src={ sprite } alt="player" /> */}
				<span className="header-text">Battle Ships</span>
				{/* <img src={sprite } alt="player" /> */}
			</div>

			{ this.props.gameOver && <div className="game-over-area">
				<div className="game-over-title">Game Over</div>
				<div className="game-over-text">You scored { this.props.score }, better luck next time!</div>
			</div> }

			<div className="info-board-instructions">
				<p>Each player places the 5 ships somewhere on their board.  The ships can only be placed vertically or horizontally. Diagonal placement is not allowed. No part of a ship may hang off the edge of the board.  Ships may not overlap each other.  No ships may be placed on another ship. Once the guessing begins, the players may not move the ships.</p>
			</div>

			<div className="player-input">
				Your name <input type="text" name="player-name" value={ this.state.playerName } onChange={ this.handlePlayerNameUpdate } />
			</div>

			<div className="button-area">
				<button
					type="button"
					disabled={ this.state.playerName === '' }
					className={ this.state.playerName === '' ? 'disabled' : '' }
					onClick={ this.props.startGame.bind(this, this.state.playerName) }>
						Play Game
				</button>
			</div>
		</div>
	}

	private styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})

	private handlePlayerNameUpdate = (event: any): void => {
		const playerName = event.target.value;

		this.setState(() => ({ playerName }))
	}
}
