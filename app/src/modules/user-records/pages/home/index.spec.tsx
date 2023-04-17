import renderer from 'react-test-renderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from '.';
import './index.scss';

jest.mock('../../services/user.service', () => ({
  UserService: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
  })),
}));

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => jest.fn(),
}));

describe('Home component', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(
      <div>
        <Home />
        <ToastContainer />
      </div>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
