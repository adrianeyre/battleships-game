import { shallow } from 'enzyme';

import BattleShips from '../battle-ships';
import IBattleShipsProps from '../interfaces/battle-ships-props';

describe('Battle Ships', () => {
	it('Should render correctly', () => {
		const defaultProps: IBattleShipsProps = {};
		const battleShips = shallow(<BattleShips {...defaultProps} />);
		expect(battleShips).toMatchSnapshot();
	});
});