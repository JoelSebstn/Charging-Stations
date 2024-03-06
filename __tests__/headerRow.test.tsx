import { render, screen } from "@testing-library/react-native";
import { HeaderRow } from "../src/components/headerRow/headerRow";
import renderer from 'react-test-renderer';

describe('TEst Header Row', () => {
    it('should render name', () => {
        const { getByText } = render(
            <HeaderRow />,
        );
        const label = getByText("Name");
        expect(label).toBeTruthy();
    });
    it('should render the Status', () => {
        const { getByText } = render(
            <HeaderRow />,
        );
        const label = getByText("Status");
        expect(label).toBeTruthy();
    });
    it('renders the correct message', () => {
        const { queryByText } = render(<HeaderRow />);
        expect(queryByText('Status')).not.toBeNull();
    });
    it("Matches Header Snapshot", () => {
        const domTree = renderer.create(<HeaderRow />).toJSON();
        expect(domTree).toMatchSnapshot();
    });
})