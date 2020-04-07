import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import FourZeroFour from "../FourZeroFour";

function Machine() {
    let {id} = useParams();
    const [pageData, setPageData] = useState({empty: true});

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(`https://pokeapi.co/api/v2/machine/${id}/`);
                let machineData = {
                    "id": data.id,
                    "name": data.item.name,
                    "empty": false
                };

                setPageData(machineData)
            } catch (e) {
                return <FourZeroFour/>
            }
        }

        fetchData()
    }, [id]);

    if (pageData.empty) {
        return <FourZeroFour/>
    }

    return (
        <div>
            <h1>Id: {pageData.id}</h1>
            <h1>Name: {pageData.name}</h1>
        </div>
    )
}

export default Machine;