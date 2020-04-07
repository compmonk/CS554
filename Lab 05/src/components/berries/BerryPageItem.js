import React from "react";


function BerryPageItem(props) {
    const urlList = props.url.split('/');
    const id = urlList[urlList.length - 2];
    return (
        <tr className="berry-item" onClick={() => window.location.href = `/berries/${id}`}>
            <td>{id}</td>
            <td><h4>{props.name}</h4></td>
        </tr>
    )
}

export default BerryPageItem;