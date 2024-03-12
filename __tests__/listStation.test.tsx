import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ListStations } from "../src/screens/ListStations";
import renderer from 'react-test-renderer';
import React from "react";

jest.mock('../src/utilities/firebaseServices.tsx', () => ({
    anonymousAuthentication: jest.fn(() => Promise.resolve('Mocked Data')),
    fetchStationsFromFirebase: jest.fn(() => Promise.resolve('Mocked Data')),
}));
describe("Test list screens", () => {
    it('screen renders name correctly', async () => {
        // Mock Firestore snapshot data
        const mockSnapshotData = [
            { id: 1, "name": 'Job Richi', "status": "Available" },
            { id: 2, "name": 'Ivan mark', "status": "Unknown" },
        ];

        // // Mock onSnapshot function
        // const mockOnSnapshot = jest.fn().mockImplementation(callback => {
        //     callback({
        //         forEach: jest.fn(fn => mockSnapshotData.forEach(fn)),
        //     });
        // });

        // // Mock Firestore collection
        // const mockCollection = jest.fn().mockReturnValue({
        //     orderBy: jest.fn().mockReturnValue({
        //         limit: jest.fn().mockReturnValue({
        //             onSnapshot: mockOnSnapshot,
        //         }),
        //     }),
        // });

        // // Mock Firestore
        // jest.fn().mockReturnValue({
        //     collection: mockCollection,
        // });
        const setStateMock = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([mockSnapshotData, setStateMock]);
        const { getByText } = render(
            <NavigationContainer><ListStations /></NavigationContainer>,);
        expect(getByText('Job Richi')).toBeDefined();
        await waitFor(() => {
        });
    })
    it('screen renders status correctly', () => {
        const { getByText } = render(
            <NavigationContainer><ListStations /></NavigationContainer>,);

        // Assert that your component renders correctly based on the mock data
        expect(getByText('Available')).toBeTruthy();
    })
    it("Matches screen Snapshot", () => {
        const domTree = renderer.create(
            <NavigationContainer><ListStations /></NavigationContainer>).toJSON();
        expect(domTree).toMatchSnapshot();
    });
})