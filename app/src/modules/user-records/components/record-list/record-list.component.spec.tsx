import renderer from 'react-test-renderer';
import { RecordList } from './record-list.component';

jest.mock('./record-list.component.scss', () => ({}));

describe('RecordList', () => {
  it('renders the day and time values correctly', () => {
    const day = 'Monday';
    const time = '2:30 PM';
    const component = renderer.create(<RecordList day={day} time={time} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
