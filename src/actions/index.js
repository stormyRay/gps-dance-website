import {SELECT_TAG} from "../constants/actionTypes";

export const selectTag = (tag) => {
  return {
    type: SELECT_TAG,
    tag
  }
}