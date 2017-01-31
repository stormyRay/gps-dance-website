import {UPDATE_DANCERS} from "../constants/actionTypes";

const dancers = (state = [], action) => {
  switch (action.type) {
    case UPDATE_DANCERS:
       return action.dancers;
    default:
      return state;
  }
}

export default dancers;