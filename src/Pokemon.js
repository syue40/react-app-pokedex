import React from 'react'
import { NavLink } from "react-router-dom";
function Pokemon({ pokemon, setPokemons }) {
  const getThreeDigitId = (id) => {
    if (id < 10) return `00${id}`
    if (id < 100) return `0${id}`
    return id
  }

  function handleClick(){
    setPokemons(pokemon.id)
  }
  
  return (
    <NavLink
      id="active-decal"
      to={`/pokemon/${pokemon.id}`}
      onClick={handleClick}>
      <img src={`https://github.com/fanzeyi/pokemon.json/raw/master/images/${getThreeDigitId(pokemon.id)}.png`} />
    </NavLink>
  )
}

export default Pokemon