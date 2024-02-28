

import renderer from 'react-test-renderer';
import { RenderItem } from './components/rederItem';
import { render, fireEvent } from '@testing-library/react-native';

it(`renders button correctly`, () => {
    const data = { "id": 123, "name": "TEst Name", "status": "test status" }
    const tree = renderer.create(<RenderItem item={data} />).toJSON();
    expect(tree).toMatchSnapshot();
})
it('should render the name correctly', () => {

    const data = { "id": 123, "name": "TEst Name", "status": "test status" }
    const { getByText } = render(<RenderItem item={data} />);
    const label = getByText("TEst Name");
    expect(label).toBeTruthy();
});
it('should render the status correctly', () => {

    const data = { "id": 123, "name": "TEst Name", "status": "test status" }
    const { getByText } = render(<RenderItem item={data} />);
    const status = getByText("test status");
    expect(status).toBeTruthy();
});