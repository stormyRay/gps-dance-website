import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "./reducers/index";
import App from "./components/App";
//import {routes} from "./routes";
import { Router, Route, browserHistory } from "react-router";
import Dancers from "./components/Dancers";
import Training from "./components/Training";
import BusinessCase from "./components/BusinessCase";
import Lessons from "./components/Lessons";
import Brand from "./components/Brand";
import AboutUs from "./components/AboutUs";

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store} key="provider">
    	<Router history={browserHistory}>
    		<Route path="/" component={App}>
    			<Route path="/dancers" component={Dancers} />
    			<Route path="/training" component={Training} />
    			<Route path="/business+case" component={BusinessCase} />
    			<Route path="/lessons" component={Lessons} />
    			<Route path="/brand" component={Brand} />
    			<Route path="/about+us" component={AboutUs} />
			</Route>
    	</Router>
	</Provider>, document.getElementById("root"));