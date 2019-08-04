import { types } from '../actions/types';

export default function( state = [], action ) {
    switch(action.type){
      case types.NEW_EVENTER_ENTRY:
        return { ...state, eventer: action.payload };
      case types.EVENTER_LIST:
        return { ...state, eventer: action.payload };
      case types.EVENTER_LIST_BY_ID:
        return { ...state, eventer: action.payload };
      case types.UPDATE_EVENTER_ENTRY:
        return { ...state, eventer: action.payload };
      case types.DELETE_EVENTER_ENTRY:
        return { ...state, eventer: action.payload };
      default:
        return state;
    }
}
