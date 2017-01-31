import { combineReducers } from "redux";
import activeTag from "./activeTag";
import dancers from "./dancers";

const reducers = combineReducers({
	activeTag,
	dancers
});

export default reducers;