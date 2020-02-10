import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';
import IInfoBoardState from './interfaces/info-board-state';

import ship1 from '../../images/ship-01.png';
import ship2 from '../../images/ship-02.png';

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
				<img src={ ship1 } alt="ship" />
				<span className="header-text">Battle Ships</span>
				<img src={ ship2 } alt="ship" />
			</div>

			<div className="info-board-instructions">
				<p>Each player places the 5 ships somewhere on their board.  The ships can only be placed vertically or horizontally. Diagonal placement is not allowed. No part of a ship may hang off the edge of the board.  Ships may not overlap each other.  No ships may be placed on another ship. Once the guessing begins, the players may not move the ships.</p>
				<table>
					<tbody>
						<tr>
							<td className="title">Function</td>
							<td className="title">Key</td>
						</tr>
						<tr>
							<td>Move Up</td>
							<td>Mouse Up</td>
						</tr>
						<tr>
							<td>Move Down</td>
							<td>Mouse Down</td>
						</tr>
						<tr>
							<td>Move Left</td>
							<td>Mouse Left</td>
						</tr>
						<tr>
							<td>Move Right</td>
							<td>Mouse Right</td>
						</tr>
						<tr>
							<td>Rotate</td>
							<td>Right Click</td>
						</tr>
						<tr>
							<td>Select</td>
							<td>Left Click</td>
						</tr>
					</tbody>
				</table>
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
