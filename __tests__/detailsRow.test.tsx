import { render } from "@testing-library/react-native";
import { DetailsRow } from "../src/components/detailsRow";
import renderer from 'react-test-renderer';

describe("Test details ROw Componet", () => {
    it('Check contents', () => {
        const { getByText } = render(<DetailsRow rowName={'Status'} data={"Available"} />)
        const label = getByText("Available");
        expect(label).toBeTruthy();
    })
    it('renders the correct message', () => {
        const { queryByText } = render(<DetailsRow rowName={'Parking Access'} data={"Not Restricted"} />);
        expect(queryByText('Not Restricted')).not.toBeNull();
    });
    it("Matches Detail Snapshot", () => {
        const domTree = renderer.create(<DetailsRow rowName={'Status'} data={"Available"} />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

})