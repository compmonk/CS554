import React from "react";
import {Table} from "react-bootstrap";
import BerryPageItem from "./BerryPageItem";
import FourZeroFour from "../FourZeroFour";

function BerryPage(props) {
    if (props.pageData.results.length) {
        return (
            <Table variant="dark" striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Berry Name</th>
                </tr>
                </thead>
                <tbody>
                {props.pageData && props.pageData.results.map((result) => {
                    return <BerryPageItem key={result.url} url={result.url} name={result.name}/>
                })}
                </tbody>
            </Table>
        )
    }
    return (
        <FourZeroFour/>
    )
}

export default BerryPage;