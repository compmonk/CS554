import React from "react";
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'


import Home from "./components/Home";
import PokemonContainer from "./components/pokemons";
import BerryContainer from "./components/berries";
import MachineContainer from "./components/machines";
import FourZeroFour from "./components/FourZeroFour";

function App() {
    return (
        <Router>
            <div className="nav-bar">
                <Navbar bg="dark">
                    <Navbar.Brand href="/">
                        Home
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link href="/pokemon/page/0">Pokemons</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/berries/page/0">Berries</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/machines/page/0">Machines</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>
            <div>
                <Switch>
                    <Route path="/pokemon">
                        <PokemonContainer/>
                    </Route>
                    <Route path="/berries">
                        <BerryContainer/>
                    </Route>
                    <Route path="/machines">
                        <MachineContainer/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="*" component={FourZeroFour} status={404}/>
                </Switch>
            </div>
        </Router>
    );
}


export default App;