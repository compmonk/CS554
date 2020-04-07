import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BerryPage from "./BerryPage";
import Paginator from "../Paginator";

function BerryList() {
    let {page} = useParams();
    const [pageData, setPageData] = useState({next: null, previous: null, results: []});

    useEffect(() => {
        async function fetchData() {
            try {
                let url = "";
                if (page === 0) {
                    url = "https://pokeapi.co/api/v2/berry/"
                } else {
                    url = `https://pokeapi.co/api/v2/berry/?offset=${page * 20}&limit=20`
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
            <BerryPage pageData={pageData}/>
            <Paginator first={0} last={parseInt(pageData.count / 20)} current={parseInt(page)} base="/berries/page"/>
        </>
    )
}

export default BerryList;