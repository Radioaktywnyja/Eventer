import { types } from '../actions/types';
import reducers from '.';

describe ('Reducers', () => {

    it('Should return default state', () => {
        const NewState = reducers(undefined, {});
        expect(NewState).toEqual([]);
    });

    it('Should return new state if receiving type NEW_EVENTER_ENTRY', () => {
         const data = [{ title: 'Test 2' }, { title: 'Test 2' }, { title: 'Test 3' }];
         const NewState = reducers(undefined, {
             type: types.NEW_EVENTER_ENTRY,
             payload: data
         });
         expect(NewState.eventer).toEqual(data);
    });

    it('Should return new state if receiving type EVENTER_LIST', () => {
        const data = [{ title: 'Test 2' }, { title: 'Test 2' }, { title: 'Test 3' }];
        const NewState = reducers(undefined, {
            type: types.EVENTER_LIST,
            payload: data
        });
        expect(NewState.eventer).toEqual(data);
   });

    it('Should return new state if receiving type EVENTER_LIST_BY_ID', () => {
        const data = [{ title: 'Test 2' }, { title: 'Test 2' }, { title: 'Test 3' }];
        const NewState = reducers(undefined, {
            type: types.EVENTER_LIST_BY_ID,
            payload: data
        });
        expect(NewState.eventer).toEqual(data);
    });

    it('Should return new state if receiving type UPDATE_EVENTER_ENTRY', () => {
        const data = [{ title: 'Test 2' }, { title: 'Test 2' }, { title: 'Test 3' }];
        const NewState = reducers(undefined, {
            type: types.UPDATE_EVENTER_ENTRY,
            payload: data
        });
        expect(NewState.eventer).toEqual(data);
    });

    it('Should return new state if receiving type DELETE_EVENTER_ENTRY', () => {
        const data = [{ title: 'Test 2' }, { title: 'Test 2' }, { title: 'Test 3' }];
        const NewState = reducers(undefined, {
            type: types.DELETE_EVENTER_ENTRY,
            payload: data
        });
        expect(NewState.eventer).toEqual(data);
    });




});