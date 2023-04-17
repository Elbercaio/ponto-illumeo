import renderer from 'react-test-renderer';
import { SubmitButton } from './submit-button.component';

describe('SubmitButton', () => {
  it('renders the button text correctly', () => {
    const buttonText = 'Submit';
    const component = renderer.create(<SubmitButton>{buttonText}</SubmitButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the onClick function when the button is clicked', () => {
    const onClick = jest.fn();
    const buttonText = 'Submit';
    const component = renderer.create(<SubmitButton onClick={onClick}>{buttonText}</SubmitButton>);
    const buttonElement = component.root.findByType('button');
    buttonElement.props.onClick();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
