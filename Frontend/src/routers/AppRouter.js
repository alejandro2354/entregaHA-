import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Login } from "../components/Login";
import Root from "../Root";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/Index" component={Root} />
                <PublicRoute exact path="/" component={Login} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
}
