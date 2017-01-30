import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "./reducers/index";
import App from "./components/App";
//import {routes} from "./routes";
import { Router, Route, browserHistory } from "react-router";

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store} key="provider">
    	<Router history={browserHistory}>
    		<Route path="/" component={App}>
			</Route>
    	</Router>
	</Provider>, document.getElementById("root"));