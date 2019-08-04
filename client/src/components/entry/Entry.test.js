import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../utils/testUtils';
import Entry from './index';
import Form from './../form';

const setUp = (props={}) => {
    const component = shallow(<Entry {...props} />);
    return component;
};

describe('Entry Component', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAttr(component, 'entryComponent');
        expect(wrapper.length).toBe(1);
    });

    it('Should render Form component for new entry', () => {
        expect(
            component.containsMatchingElement(
                <Form mode="new" row="[]" />
            )
        ).toBe(true);
    });
    
});