import renderer from 'react-test-renderer';
import { InputText } from './input-text.component';

describe('InputText', () => {
  it('renders the label and input with the correct name', () => {
    const tree = renderer.create(<InputText label="First Name" name="firstName" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
