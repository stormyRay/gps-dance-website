import {SELECT_TAG, UPDATE_DANCERS} from "../constants/actionTypes";
import fetch from "isomorphic-fetch";

export const selectTag = (tag) => {
  return {
    type: SELECT_TAG,
    tag
  }
}

// export const shouldGetDancers = () =>{
// 	return (dispatch, getState) => {
//     if (!getState().dancers) {
//       return dispatch(getDancers())
//     }
//   }
// }

export const getDancers = () => {
	return dispatch => {
    return fetch("/getDancers.json")
      .then(response => response.json())
      .then(json => dispatch(updateDancers(json.dancers)))
  }
}

export const updateDancers = (dancers) => {
	return{
		type: UPDATE_DANCERS,
		dancers
	}
}