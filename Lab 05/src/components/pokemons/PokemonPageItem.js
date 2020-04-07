import React from "react";


function PokemonPageItem(props) {
    const urlList = props.url.split('/');
    const id = urlList[urlList.length - 2];
    return (
        <tr className="pokemon-item" onClick={() => window.location.href = `/pokemon/${id}`}>
            <td>{id}</td>
            <td><img
                width={64}
                height={64}
                className="mr-3"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`}
                alt="avatar"
            /></td>
            <td><h4>{props.name}</h4></td>
        </tr>
    )
}

export default PokemonPageItem;