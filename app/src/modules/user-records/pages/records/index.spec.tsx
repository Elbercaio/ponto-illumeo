import renderer from 'react-test-renderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Records } from '.';
import './index.scss';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ search: '?code=123' }),
}));

jest.mock('../../services/user-record.service', () => ({
  UserRecordService: jest.fn().mockImplementation(() => ({
    getDailyUserRecord: jest.fn().mockResolvedValue({ data: [] }),
    postUserRecord: jest.fn().mockResolvedValue({ data: [] }),
  })),
}));

describe('Records component', () => {
  it('should render the component', async () => {
    const tree = renderer.create(
      <div>
        <Records />
        <ToastContainer />
      </div>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
