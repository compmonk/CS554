import {Route, Switch, useRouteMatch} from "react-router-dom";
import React from "react";
import BerryList from "./BerryList";
import Berry from "./Berry";

function BerryContainer() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.path}/page/:page`}>
                    <BerryList/>
                </Route>
                <Route path={`${match.path}/:id`}>
                    <Berry/>
                </Route>
            </Switch>
        </div>
    );
}


export default BerryContainer;