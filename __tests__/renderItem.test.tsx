import { fireEvent, render } from "@testing-library/react-native";
import { RenderItem } from "../src/components/renderItem";
import { NavigationContainer } from "@react-navigation/native";
import renderer from 'react-test-renderer';
const mockData = { "id": 123, "name": "Harry", "status": "Available" }
describe('Testing rendering Item', () => {
    it('Check status contents', () => {
        const { getByText } = render(<NavigationContainer><RenderItem item={mockData} /></NavigationContainer>)
        const label = getByText("Available");
        expect(label).toBeTruthy();
    })
    it('should render name', () => {
        const { getByText } = render(
            <NavigationContainer><RenderItem item={mockData} /></NavigationContainer>,
        );
        const label = getByText("Harry");
        expect(label).toBeTruthy();
    });
    it("Matches Header Snapshot", () => {
        const domTree = renderer.create(<NavigationContainer><RenderItem item={mockData} /></NavigationContainer>).toJSON();
        expect(domTree).toMatchSnapshot();
    });
    it('check click', () => {
        const { getByText } = render(
            <NavigationContainer><RenderItem item={mockData} /></NavigationContainer>,
        );
        fireEvent.press(getByText("Harry"));
        expect(getByText('Available')).toBeTruthy();
    })
})