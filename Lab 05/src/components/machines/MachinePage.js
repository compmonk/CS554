import React from "react";
import {Table} from "react-bootstrap";
import MachinePageItem from "./MachinePageItem";
import FourZeroFour from "../FourZeroFour";

function MachinePage(props) {
    if (props.pageData.results.length) {
        return (
            <Table variant="dark" striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                </tr>
                </thead>
                <tbody>
                {props.pageData && props.pageData.results.map((result) => {
                    return <MachinePageItem key={result.url} url={result.url}/>
                })}
                </tbody>
            </Table>
        )
    }
    return (
        <FourZeroFour/>
    )
}

export default MachinePage;