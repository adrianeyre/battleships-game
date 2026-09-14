import React from 'react';

import Game from '../../classes/game';
import ISprite from '../../classes/interfaces/sprite';
import PlayerResultEnum from '../../classes/enums/player-result-enum';
import IBattleShipsProps from './interfaces/battle-ships-props';
import IBattleShipsState from './interfaces/battle-ships-state';
import DrawSprite from '../draw-sprite/draw-sprite';
import InfoBoard from '../info-board/info-board';
import GameStatus from '../game-status/game-status';
import FlashMessage from '../flash-message/flash-message';

import './styles/battle-ships.scss';

export default class BattleShips extends React.Component<IBattleShipsProps, IBattleShipsState> {
  private SPRITE_BLOCKS_WIDTH: number = 21;
  private SPRITE_BLOCKS_HEIGHT: number = 21;
  private container: HTMLDivElement | null = null;

  constructor(props: IBattleShipsProps) {
    super(props);

    this.state = {
      spriteWidth: 0,
      spriteHeight: 0,
      containerWidth: 800,
      containerHeight: 800,
      containerMargin: 0,
      timerInterval: 1000,
      messages: [],
      chatMessage: '',
    };
  }

  public componentDidMount() {
    this.updatePlayerArea();
    window.addEventListener('resize', this.updatePlayerArea);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public componentWillUnmount() {
    // Straight `clearInterval` rather than `stopTimer`: setting state on an
    // unmounted component is a no-op that React warns about.
    clearInterval(this.state.timer);
    window.removeEventListener('resize', this.updatePlayerArea);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  public render() {
    return (
      <div
        className="battle-ships-play-container"
        ref={(d) => {
          this.container = d;
        }}
        style={this.styleContainer()}
      >
        {(!this.state.game || !this.state.game.isGameInPlay) && (
          <InfoBoard startGame={this.startGame} containerHeight={this.state.containerHeight} />
        )}

        {this.state.game && (
          <div>
            <div className="play-area">
              {this.state.game.players[0].sprites.map((sprite: ISprite) => (
                <DrawSprite
                  key={sprite.key}
                  onMouseOver={this.onMouseOver}
                  onContextMenu={this.onContextMenu}
                  onClick={this.onClick}
                  sprite={sprite}
                  height={this.state.spriteHeight}
                  width={this.state.spriteWidth}
                  containerWidth={this.state.containerWidth}
                />
              ))}
              {this.state.game.players[1].sprites.map((sprite: ISprite) => (
                <DrawSprite
                  key={sprite.key}
                  onClick={this.onOpponentClick}
                  sprite={sprite}
                  height={this.state.spriteHeight}
                  width={this.state.spriteWidth}
                  containerWidth={this.state.containerWidth}
                />
              ))}
              <DrawSprite
                key={this.state.game.turnSprite.key}
                onClick={this.onTurnClick}
                sprite={this.state.game.turnSprite}
                height={this.state.spriteHeight}
                width={this.state.spriteWidth}
                containerWidth={this.state.containerWidth}
              />
            </div>

            <div>
              <GameStatus
                messages={this.state.game.data.messages}
                handleSendMessage={this.handleSendMessage}
                containerWidth={this.state.containerWidth}
                spriteWidth={this.state.spriteWidth}
              />
            </div>

            {this.state.game.flashMessage && (
              <FlashMessage
                message={this.state.game.flashMessage}
                containerHeight={this.state.containerHeight}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  private styleContainer = () => ({
    maxWidth: `${this.state.containerHeight}px`,
    marginLeft: `${this.state.containerMargin}px`,
  });

  private startGame = async (playerName?: string): Promise<void> => {
    const props = { ...this.props, playerName };
    const game = new Game(props);
    game.isGameInPlay = true;
    this.startTimer();
    this.setState(() => ({ game }));
    this.updatePlayerArea();
  };

  private updatePlayerArea = (): void => {
    const containerHeight = this.container ? this.container.getBoundingClientRect().height : 0;
    let containerWidth = this.container ? this.container.getBoundingClientRect().width : 0;
    const containerMargin = (window.innerWidth - containerWidth) / 2;
    if (containerWidth > containerHeight) containerWidth = containerHeight;
    const spriteWidth = containerWidth / this.SPRITE_BLOCKS_WIDTH;
    const spriteHeight = ((containerWidth / 100) * 100) / this.SPRITE_BLOCKS_HEIGHT;
    this.setState(() => ({
      spriteWidth,
      spriteHeight,
      containerWidth,
      containerHeight,
      containerMargin,
    }));
  };

  private handleInput = (input: PlayerResultEnum, key?: string): void => {
    if (!this.state.game) return;

    const game = this.state.game;
    game.handleInput(input, key);

    if (!game.isGameInPlay) this.stopTimer();
    this.setState(() => ({ game }));
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.state.game || !this.state.game.isGameInPlay) return;

    this.handleInput(event.keyCode);
  };

  private startTimer = (): void => {
    const timer = setInterval(this.myTimer, this.state.timerInterval);

    this.setState(() => ({ timer }));
  };

  private stopTimer = (): void => {
    clearInterval(this.state.timer);

    this.setState(() => ({ timer: undefined }));
  };

  private myTimer = (): void => {
    if (!this.state.game) return;
    const game = this.state.game;

    this.setState(() => ({ game }));
  };

  private onMouseOver = (key: string): void => this.handleInput(PlayerResultEnum.HOVER, key);
  private onClick = (key: string): void => this.handleInput(PlayerResultEnum.SELECT, key);
  private onOpponentClick = (key: string): void => this.handleInput(PlayerResultEnum.FIRE, key);
  private onContextMenu = (key: string): void =>
    this.handleInput(PlayerResultEnum.RIGHT_SELECT, key);
  private onTurnClick = (): void => {};

  private handleSendMessage = (message: string): void => {
    if (!this.state.game) return;
    this.state.game.sendMessage(message);
  };
}
