import React from 'react';
import renderer from 'react-test-renderer';
import { Search } from '../../src/client/app/components/search';

describe('components', () => {
    describe('<Search />', () => {
        it('renders correctly', () => {
            const tree = renderer.create(<Search dispatch={() => true} />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
