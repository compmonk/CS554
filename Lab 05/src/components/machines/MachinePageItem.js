import React from "react";


function MachinePageItem(props) {
    const urlList = props.url.split('/');
    const id = urlList[urlList.length - 2];
    return (
        <tr className="machine-item" onClick={() => window.location.href = `/machines/${id}`}>
            <td>{id}</td>
        </tr>
    )
}

export default MachinePageItem;