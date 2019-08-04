import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, testStore } from '../../utils/testUtils';
import Form from './index';

const setUp = (initialState={}, mode) => {
    const store = testStore(initialState);
    const wrapper = mount(<Form store={store} row={[]} mode={mode} />);
    return wrapper;
};

describe('Form Component', () => {

    describe('Form with mode EDIT', () => {

        let wrapper;
        beforeEach(() => {
            const initialState = {
                id: '1',
                first_name: 'fname',
                last_name: 'lname',
                email_address: 'email',
                event_date: 'date',
                redirect: false
            }
            wrapper = setUp(initialState, 'edit');
        });

        it('Should render without errors', () => {
            const component = findByTestAttr(wrapper, 'formComponent');
            expect(component.length).toBe(1);
        });

        it('Should render title', () => {
            expect(
                wrapper.contains('Edit Entry')
            ).toBe(true);
        });

    });

    describe('Form with mode NEW', () => {

        let wrapper;
        beforeEach(() => {
            const initialState = {
                id: '1',
                first_name: 'fname',
                last_name: 'lname',
                email_address: 'email',
                event_date: 'date',
                redirect: false
            }
            wrapper = setUp(initialState, 'new');
        });

        it('Should render without errors', () => {
            const component = findByTestAttr(wrapper, 'formComponent');
            expect(component.length).toBe(1);
        });

        it('Should render title', () => {
            expect(
                wrapper.contains('New Entry')
            ).toBe(true);
        });

    });

});
