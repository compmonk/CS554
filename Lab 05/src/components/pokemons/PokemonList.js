import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import PokemonPage from "./PokemonPage";
import Paginator from "../Paginator";

function MachineList(props) {
    let {page} = useParams();
    const [pageData, setPageData] = useState({next: null, previous: null, results: []});

    useEffect(() => {
        async function fetchData() {
            try {
                let url = ""
                if (page === 0) {
                    url = "https://pokeapi.co/api/v2/pokemon/"
                } else {
                    url = `https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`
                }

                const {data} = await axios.get(url);
                setPageData(data);
            } catch (e) {
                console.log(e.toString())
            }
        }

        fetchData()
    }, [page]);

    return (
        <>
            <PokemonPage pageData={pageData}/>
            <Paginator first={0} last={parseInt(pageData.count / 20)} current={parseInt(page)} base="/pokemon/page"/>
        </>
    )
}

export default MachineList;