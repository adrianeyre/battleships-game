import React from 'react';
import socketIOClient from "socket.io-client";

import Game from '../../classes/game';
import ISprite from '../../classes/interfaces/sprite';
import IBattleShipsProps from './interfaces/battle-ships-props';
import IBattleShipsState from './interfaces/battle-ships-state';
import DrawSprite from '../draw-sprite/draw-sprite';
import InfoBoard from '../info-board/info-board';
import GameStatus from '../game-status/game-status';

import './styles/battle-ships.scss';
import PlayerResultEnum from 'classes/enums/player-result-enum';

export default class BattleShips extends React.Component<IBattleShipsProps, IBattleShipsState> {
	private SPRITE_BLOCKS_WIDTH: number = 21;
	private SPRITE_BLOCKS_HEIGHT: number = 21;
	private container: any;
	private END_POINT: string = 'http://localhost:5000';

	constructor(props: IBattleShipsProps) {
		super(props);

		this.state = {
			spriteWidth: 0,
			spriteHeight: 0,
			containerWidth: 800,
			containerHeight: 800,
			containerMargin: 0,
			timerInterval: 0,
			game: new Game(this.props),
			messages: [],
			chatMessage: '',
		}

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.styleContainer = this.styleContainer.bind(this);
	}

	public async componentDidMount() {
		this.updatePlayerArea();
		window.addEventListener('resize', this.updatePlayerArea);
		window.addEventListener('keydown', this.handleKeyDown);

		const socket = socketIOClient(this.END_POINT);
		await this.setState(() => ({ socket }));

		this.state.socket.on("message", (message: any) => this.handleMessage(message));
	}

	public async componentWillUnmount() {
		await this.stopTimer();
		window.removeEventListener('resize', this.updatePlayerArea);
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	public render() {
		return <div className="battle-ships-play-container" ref={(d) => { this.container = d }} style={ this.styleContainer() }>

			{ !this.state.game.isGameInPlay && <InfoBoard gameOver={ !this.state.game.player.isAlive } startGame={ this.startGame } score={ this.state.game.player.score } containerHeight={ this.state.containerHeight } /> }

			{ this.state.game.isGameInPlay && <div className="play-area">
				{ this.state.game.board.sprites?.map((sprite: ISprite) => <DrawSprite key={ sprite.key } sprite={ sprite } height={ this.state.spriteHeight } width={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } />) }
			</div> }

			{ this.state.game.isGameInPlay && <div>
				<GameStatus messages={ this.state.messages } handleSendMessage={ this.handleSendMessage } containerWidth={ this.state.containerWidth} spriteWidth={ this.state.spriteWidth } ></GameStatus>
			</div> }
		</div>
	}

	private styleContainer = () => ({
		maxWidth: `${ this.state.containerHeight }px`,
		marginLeft: `${ this.state.containerMargin }px`
	})

	private startGame = async (): Promise<void> => {
		const game = new Game(this.props);
		game.isGameInPlay = true;
		await this.startTimer();
		await this.setState(() => ({ game }));
		this.updatePlayerArea();
	}

	private updatePlayerArea = (): void => {
		const containerHeight = this.container && this.container.getBoundingClientRect().height;
		let containerWidth = this.container && this.container.getBoundingClientRect().width;
		const containerMargin = (window.innerWidth - containerWidth) / 2;
		if (containerWidth > containerHeight) containerWidth = containerHeight;
		const spriteWidth = containerWidth / this.SPRITE_BLOCKS_WIDTH;
		const spriteHeight = ((containerWidth / 100) * 100 ) / this.SPRITE_BLOCKS_HEIGHT;
		this.setState(() => ({ spriteWidth, spriteHeight, containerWidth, containerHeight, containerMargin }))
	}

	private handleInput = async (input: PlayerResultEnum): Promise<void> => {
		const game = this.state.game;
		game.handleInput(input);

		if (!game.isGameInPlay) this.stopTimer();
		await this.setState(() => ({ game }));

		if (this.state.game.timerInterval !== this.state.timerInterval) {
			this.stopTimer();
			this.startTimer();
		}
	}

	private handleKeyDown = async (event: any): Promise<void> => {
		if (!this.state.game.isGameInPlay) return;

		await this.handleInput(event.keyCode);
	}

	private startTimer = async (): Promise<void> => {
		const timerInterval = this.state.game.timerInterval;
		const timer = setInterval(this.myTimer, this.state.game.timerInterval);

		await this.setState(() => ({ timer, timerInterval }));
	}

	private stopTimer = async (): Promise<void> => {
		clearInterval(this.state.timer);

		await this.setState(() => ({ timer: undefined }));
	}

	private myTimer = (): void => {
		const game = this.state.game
		game.handleTimer();

		this.setState(prev => ({ game }));
	}

	private handleSendMessage = async (message: string) => {
		if (!this.state.socket) return;

		this.state.socket.emit("message", message);
		
	}

	private handleMessage = async (message: string) => {
		const messages = this.state.messages;
		messages.unshift(message);

		await this.setState(() => ({ messages }));
	}
}
