import { shallow } from 'enzyme';

import InfoBoard from '../info-board';
import IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
	it('Should render correctly', () => {
		const defaultProps: IInfoBoardProps = {
			containerHeight: 1000,
			startGame: jest.fn(),
		};

		const infoBoard = shallow(<InfoBoard {...defaultProps} />);
		expect(infoBoard).toMatchSnapshot();
	});
});