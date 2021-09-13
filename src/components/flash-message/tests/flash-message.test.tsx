import { shallow } from 'enzyme';

import FlashMessage from '../flash-message';
import IFlashMessageProps from '../interfaces/flash-message-props';
import MessageActionEnum from '../../../services/enums/message-action-enum';

describe('Info Board', () => {
	it('Should render correctly', () => {
		const defaultProps: IFlashMessageProps = {
			message: {
				action: MessageActionEnum.MESSAGE,
				id: 'id',
				name: 'name',
				message: 'HELLO',
				colour: 'black',
			},
			containerHeight: 1000,
		};

		const flashMessage = shallow(<FlashMessage {...defaultProps} />);
		expect(flashMessage).toMatchSnapshot();
	});
});