import { types } from './types';
import axios from 'axios';

/* Create an eventer entry */
export function newEventerEntry( fields ){
   const request = axios.post('/create', fields );
   return {
      type: types.NEW_EVENTER_ENTRY,
      payload: request
   }
}

/* Retrieve all eventers */
export function eventerList(){
   const request = axios.get('/read');
   return {
      type: types.EVENTER_LIST,
      payload: request
   }
}

/* Retrieve a single record by id */
export function eventerListById( id ){
   const request = axios.get('/readbyid/', { params: { id: id } });
   return {
      type: types.EVENTER_LIST_BY_ID,
      payload: request
   }
}

/* Update eventer information */
export function updateEventerEntry( fields ){
   const request = axios.put('/update', fields );
   return {
      type: types.UPDATE_EVENTER_ENTRY,
      payload: request
   }
}

/* Delete an entry by id */
export function deleteEventerEntry( entryid ){
   const request = axios.delete('/delete', { params : { entryid: entryid } } );
   return {
      type: types.DELETE_EVENTER_ENTRY,
      payload: request
   }
}
