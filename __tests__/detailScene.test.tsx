import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ListStations } from "../src/screens/ListStations";
import renderer from 'react-test-renderer';
import React from "react";
import { DetailsScene } from "../src/screens/DetailsScene";

jest.mock('../src/utilities/firebaseServices.tsx', () => ({
    fetchStationDetails: jest.fn(() => Promise.resolve('Mocked Data')),
}));
const mockSnapshotData =
{
    id: 1,
    "name": 'Job Richie',
    "status": "Available",
    "openingHours": "9:00AM",
    "operator": "Jack Mack Shell",
    "parkingAccess": "True",
    "addressDetail": { "address": "Home", "city": "Rome" }
};
const mockRoute = { "params": { "stationId": "123" } };
const setStateMock = jest.fn();
jest.spyOn(React, 'useState').mockReturnValue([mockSnapshotData, setStateMock]);
describe("Test details screen", () => {
    it('screen renders name correctly', async () => {
        const { getByText } = render(
            <NavigationContainer><DetailsScene route={mockRoute} /></NavigationContainer>,);
        expect(getByText('Job Richie')).toBeDefined();
        await waitFor(() => {
        });
    })
    it('screen renders status correctly', () => {
        const { getByText } = render(
            <NavigationContainer><DetailsScene route={mockRoute} /></NavigationContainer>,);
        expect(getByText('Available')).toBeTruthy();
    })
    it('screen renders time correctly', () => {
        const { getByText } = render(
            <NavigationContainer><DetailsScene route={mockRoute} /></NavigationContainer>,);
        expect(getByText('9:00AM')).toBeTruthy();
    })
    it('screen renders operator correctly', () => {
        const { getByText } = render(
            <NavigationContainer><DetailsScene route={mockRoute} /></NavigationContainer>,);
        expect(getByText('Jack Mack Shell')).toBeTruthy();
    })
    it('screen renders address correctly', () => {
        const { getByText } = render(
            <NavigationContainer><DetailsScene route={mockRoute} /></NavigationContainer>,);
        expect(getByText('Home,Rome')).toBeTruthy();
    })
    it("Matches screen Snapshot", () => {
        const domTree = renderer.create(
            <NavigationContainer><DetailsScene route={mockRoute} /></NavigationContainer>).toJSON();
        expect(domTree).toMatchSnapshot();
    });
})