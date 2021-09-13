import { FC } from 'react';

import IFlashMessageProps from './interfaces/flash-message-props';

import './styles/flash-message.scss';

const FlashMessage: FC<IFlashMessageProps> = (props: IFlashMessageProps) => {
	const styleFlashMessage = (color: string) => ({
		width: `100%`,
		maxWidth: `${ props.containerHeight }px`,
		color,
	})

	return <div className="flash-message" style={ styleFlashMessage(props.message.colour) }>
		<div className="message">{ props.message.message }</div>
	</div>
}

export default FlashMessage;
