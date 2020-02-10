import React from 'react';

import IFlashMessageProps from './interfaces/flash-message-props';

import './styles/flash-message.scss';

export default class FlashMessage extends React.Component<IFlashMessageProps, {}> {
	public render() {
		return <div className="flash-message" style={ this.styleFlashMessage(this.props.message.colour) }>
			<div className="message">{ this.props.message.message }</div>
		</div>
	}

	private styleFlashMessage = (color: string) => ({
		width: `100%`,
		maxWidth: `${ this.props.containerHeight }px`,
		color,
	})
}
