import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Badge} from "react-bootstrap";
import FourZeroFour from "../FourZeroFour";

function Pokemon() {
    let {id} = useParams();
    const [pageData, setPageData] = useState({abilities: [], types: [], stats: {}, moves: [], empty: true});

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                let pokemonData = {
                    "id": data.id,
                    "name": data.name,
                    "height": data.height,
                    "weight": data.weight,
                    "experience": data.base_experience,
                    "abilities": data.abilities.map((ability) => ability.ability.name),
                    "types": data.types.map((type) => type.type.name),
                    "image": data.sprites.front_default,
                    "stats": data.stats.map((stat) => {
                        return {
                            "name": stat.stat.name,
                            "base_stat": stat.base_stat
                        }
                    }),
                    "moves": data.moves.map((move) => move.move.name),
                    "empty": false
                };

                setPageData(pokemonData)
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
            <img height={200} width={200} src={pageData.image} alt="Pokemon Avatar"/>
            <h1>Id: {pageData.id}</h1>
            <h1>Name: {pageData.name}</h1>
            <h2>Height: {pageData.height}</h2>
            <h2>Weight: {pageData.weight}</h2>
            <h2>Experience: {pageData.experience}</h2>
            <h2>Abilities: {pageData.abilities.length}</h2>
            <h2>Moves: {pageData.moves.length}</h2>
            <div>
                <h3>Abilities:</h3>
                {pageData.abilities && pageData.abilities.map((ability) => <h3 key={ability}><Badge
                    variant="primary">{ability}</Badge>
                </h3>)}
            </div>
            <div>
                <h3>Types:</h3>
                {pageData.types && pageData.types.map((type) => <h3 key={type}><Badge variant="danger">{type}</Badge>
                </h3>)}
            </div>
            <div>
                <h3>Moves:</h3>
                {pageData.moves && pageData.moves.map((move) => <h3 key={move}><Badge variant="warning">{move}</Badge>
                </h3>)}
            </div>
        </div>
    )
}

export default Pokemon;