import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon";

function PokemonContainer() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.path}/page/:page`}>
                    <PokemonList/>
                </Route>
                <Route path={`${match.path}/:id`}>
                    <Pokemon/>
                </Route>
            </Switch>
        </div>
    );
}


export default PokemonContainer;