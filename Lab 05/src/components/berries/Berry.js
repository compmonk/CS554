import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Badge} from "react-bootstrap";
import FourZeroFour from "../FourZeroFour";

function Berry() {
    let {id} = useParams();
    const [pageData, setPageData] = useState({flavors: [], types: [], stats: {}, moves: [], empty: true});

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(`https://pokeapi.co/api/v2/berry/${id}/`);
                let berryData = {
                    "id": data.id,
                    "name": data.name,
                    "max_harvest": data.max_harvest,
                    "natural_gift_power": data.natural_gift_power,
                    "size": data.size,
                    "smoothness": data.smoothness,
                    "soil_dryness": data.soil_dryness,
                    "flavors": data.flavors.map((flavor) => flavor.flavor.name),
                    "empty": false
                };

                setPageData(berryData)
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
            <h2>Max Harvest: {pageData.max_harvest}</h2>
            <h2>Natural Gift Power: {pageData.natural_gift_power}</h2>
            <h2>Size: {pageData.size}</h2>
            <h2>Flavors: {pageData.flavors.length}</h2>
            <h2>Smoothness: {pageData.smoothness}</h2>
            <h2>Soil Drynes: {pageData.soil_dryness}</h2>
            <div>
                <h3>Flavors:</h3>
                {pageData.flavors && pageData.flavors.map((flavor) => <h3 key={flavor}><Badge variant="primary">{flavor}</Badge>
                </h3>)}
            </div>
        </div>
    )
}

export default Berry;