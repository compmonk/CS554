import React from "react";
import {Table} from "react-bootstrap";
import PokemonPageItem from "./PokemonPageItem";
import FourZeroFour from "../FourZeroFour";

function PokemonPage(props) {
    if (props.pageData.results.length) {
        return (
            <Table variant="dark" striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Pokemon Name</th>
                </tr>
                </thead>
                <tbody>
                {props.pageData && props.pageData.results.map((result) => {
                    return <PokemonPageItem key={result.url} url={result.url} name={result.name}/>
                })}
                </tbody>
            </Table>
        )
    }
    return (
        <FourZeroFour/>
    )
}

export default PokemonPage;