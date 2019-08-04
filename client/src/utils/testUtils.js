import { applyMiddleware, createStore } from 'redux';
import reducer from '../reducers';
import { middlewares } from '../createStore';
 
export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(reducer, initialState);
};