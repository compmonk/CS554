import {Route, Switch, useRouteMatch} from "react-router-dom";
import React from "react";

import MachinesList from "./MachineList";
import Machine from "./Machine";

function MachineContainer() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.path}/page/:page`}>
                    <MachinesList/>
                </Route>
                <Route path={`${match.path}/:id`}>
                    <Machine/>
                </Route>
            </Switch>
        </div>
    );
}

export default MachineContainer;