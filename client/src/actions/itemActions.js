import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM ,ITEMS_LOADING} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
// import { IItem } from '../../types/interfaces';
// import {IItem } from "../types/interface";
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
     );
};

export const addItem = item =>(dispatch,getState)=> (
  // dispatch: Function,
  // getState: Function
) => {
  axios
    .post('/api/items', item,tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItems = id => (dispatch, getState) =>(
  // dispatch: Function,
  // getState: Function
) => {
  axios
    .delete(`/api/items/${id}`,tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
