import {Pagination} from "react-bootstrap";
import React from "react";

function Paginator(props) {

    if (props.base[props.base.length - 1] === '/') {
        props.base = props.base.substr(0, props.base.length - 1)
    }

    let buttons = [
        <Pagination.First key={"F"} onClick={() => window.location.href = `${props.base}/${props.first}`}/>
    ];

    if (props.current === props.first) {
        buttons.push(
            <Pagination.Prev disabled key={"-1"}/>
        );
        buttons.push(
            <Pagination.Item key={props.current} active>{props.current}</Pagination.Item>
        )
    } else {
        buttons.push(
            <Pagination.Prev key={"-1"} onClick={() => window.location.href = `${props.base}/${props.current - 1}`}/>
        );
        buttons.push(
            <Pagination.Item key={props.current} active>{props.current}</Pagination.Item>
        )
    }

    if (props.current === props.last) {
        buttons.push(
            <Pagination.Next disabled key={"+1"}/>
        )
    } else {
        buttons.push(
            <Pagination.Next key={"+1"} onClick={() => window.location.href = `${props.base}/${props.current + 1}`}/>
        )
    }

    buttons.push(
        <Pagination.Last key={"L"} onClick={() => window.location.href = `${props.base}/${props.last}`}/>
    );


    return (
        <Pagination>{buttons}</Pagination>
    )
}

export default Paginator;
