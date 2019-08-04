import React from 'react';
import { shallow } from 'enzyme';
import { Route } from "react-router-dom";
import { findByTestAttr } from '../../utils/testUtils';
import Header from './index';
import Entry from "./../entry";
import List from "./../list";
import Edit from "./../edit";

const setUp = () => {
    const component = shallow(<Header />);
    return component;
};

describe('Header Component', () => {

    describe('Rendering test', () => {

        let component;
        beforeEach(() => {
            component = setUp();
        });

        it('Should render without errors', () => {
            const wrapper = findByTestAttr(component, 'headerComponent');
            expect(wrapper.length).toBe(1);
        });

        it('Should render link to List on / route', () => {
            const wrapper = findByTestAttr(component, 'linkToList');
            expect(wrapper.length).toBe(1);
            expect(wrapper.prop('to')).toEqual('/');
        });

        it('Should render link to Entry on /entry route', () => {
            const wrapper = findByTestAttr(component, 'linkToEntry');
            expect(wrapper.length).toBe(1);
            expect(wrapper.prop('to')).toEqual('/entry'); 
        });

    });

    let pathMap = {};
    describe('Routes test', () => {

        beforeAll(() => {
            const component = setUp();
            pathMap = component.find(Route).reduce((pathMap, route) => {
                const routeProps = route.props();
                pathMap[routeProps.path] = routeProps.component;
                return pathMap;
            }, {});
        });

        it('should show List component for / router (getting array of routes)', () => {
            expect(pathMap['/']).toBe(List);
        });

        it('should show Entry component for /entry router', () => {
          expect(pathMap['/entry']).toBe(Entry);
        });

        it('should show Edit component for /edit/:id router', () => {
            expect(pathMap['/edit/:id']).toBe(Edit);
        });

    });

});