/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { HeaderRow } from '../src/components/headerRow/headerRow';
import { render } from '@testing-library/react-native';
describe('sample', () => {
    it(`tests sample add`, () => {

        expect(2 + 1).toBe(3);
    })
    it('should render the label of the social link', () => {
        const { getByText } = render(
            <HeaderRow />,
        );
        const label = getByText("Name");
        expect(label).toBeTruthy();
    });
})
