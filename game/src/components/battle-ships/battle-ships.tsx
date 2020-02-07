import React from 'react';

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

	constructor(props: IBattleShipsProps) {
		super(props);

		this.state = {
			spriteWidth: 0,
			spriteHeight: 0,
			containerWidth: 800,
			containerHeight: 800,
			containerMargin: 0,
			timerInterval: 0,
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
	}

	public async componentWillUnmount() {
		await this.stopTimer();
		window.removeEventListener('resize', this.updatePlayerArea);
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	public render() {
		return <div className="battle-ships-play-container" ref={(d) => { this.container = d }} style={ this.styleContainer() }>

			{ (!this.state.game || !this.state.game.isGameInPlay) && <InfoBoard gameOver={ false } startGame={ this.startGame } score={ 0 } containerHeight={ this.state.containerHeight } /> }

			{ this.state.game && <div>
				<div className="play-area">
					{ this.state.game.players[0].sprites.map((sprite: ISprite) => <DrawSprite key={ sprite.key } onMouseOver={ this.onMouseOver } onContextMenu={ this.onContextMenu } onClick={ this.onClick } sprite={ sprite } height={ this.state.spriteHeight } width={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } />) }
					{ this.state.game.players[1].sprites.map((sprite: ISprite) => <DrawSprite key={ sprite.key } onClick={ this.onOpponentClick } sprite={ sprite } height={ this.state.spriteHeight } width={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } />) }
				</div>

				<div>
					<GameStatus messages={ this.state.game.data.messages } handleSendMessage={ this.handleSendMessage } containerWidth={ this.state.containerWidth} spriteWidth={ this.state.spriteWidth } ></GameStatus>
				</div>
			</div> }
			
		</div>
	}

	private styleContainer = () => ({
		maxWidth: `${ this.state.containerHeight }px`,
		marginLeft: `${ this.state.containerMargin }px`
	})

	private startGame = async (playerName: string): Promise<void> => {
		const props = { ...this.props, playerName}
		const game = new Game(props);
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

	private handleInput = async (input: PlayerResultEnum, key?: string): Promise<void> => {
		if (!this.state.game) return;

		const game = this.state.game;
		game.handleInput(input, key);

		if (!game.isGameInPlay) this.stopTimer();
		await this.setState(() => ({ game }));

		if (this.state.game.timerInterval !== this.state.timerInterval) {
			this.stopTimer();
			this.startTimer();
		}
	}

	private handleKeyDown = async (event: any): Promise<void> => {
		if (!this.state.game || !this.state.game.isGameInPlay) return;

		await this.handleInput(event.keyCode);
	}

	private startTimer = async (): Promise<void> => {
		if (!this.state.game) return;
		const timerInterval = this.state.game.timerInterval;
		const timer = setInterval(this.myTimer, this.state.game.timerInterval);

		await this.setState(() => ({ timer, timerInterval }));
	}

	private stopTimer = async (): Promise<void> => {
		clearInterval(this.state.timer);

		await this.setState(() => ({ timer: undefined }));
	}

	private myTimer = (): void => {
		if (!this.state.game) return;
		const game = this.state.game
		game.handleTimer();

		this.setState(prev => ({ game }));
	}

	private onMouseOver = async (key: string): Promise<void> => this.handleInput(PlayerResultEnum.HOVER, key)
	private onClick = async (key: string): Promise<void> => this.handleInput(PlayerResultEnum.SELECT, key);
	private onOpponentClick = async (key: string): Promise<void> => this.handleInput(PlayerResultEnum.FIRE, key);
	private onContextMenu = async (key: string): Promise<void> => this.handleInput(PlayerResultEnum.RIGHT_SELECT, key);

	private handleSendMessage = async (message: string) => {
		if (!this.state.game) return;
		this.state.game.sendMessage(message);
	}
}
