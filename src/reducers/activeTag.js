import {SELECT_TAG} from "../constants/actionTypes";

const activeTag = (state = {}, action) => {
  switch (action.type) {
    case SELECT_TAG:
       return action.tag;
    default:
      return state;
  }
}

export default activeTag;