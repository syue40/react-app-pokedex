import React, { useEffect, useState } from 'react'
import Page from './Page'
import Pagination from './Pagination';
import axios from 'axios'
function FilteredPagination({ types, checkedState, setPokemons }) {
  const [pokemons, setPokemonList] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      .then(res => res.data)
      .then(data => {
        // filter based on the applied filters
        if(checkedState.name){
          data = (data.filter(pokemon => pokemon.name.english.toLowerCase() === checkedState.name.toLowerCase()))
          return data
        }

        if(checkedState.id){
          data = (data.filter(pokemon => pokemon.id.toString() === checkedState.id.toString()))
          return data
        }

        if(checkedState.types_array) data = (data.filter(pokemon => 
          checkedState.types_array.every(
            (checked, i) => !checked || pokemon.type.includes(types.current[i])
          )))
          
        if(checkedState.health_range) data = (data.filter(pokemon => 
          pokemon.base.HP >= checkedState.health_range[0] && pokemon.base.HP <= checkedState.health_range[1]
          ))

        if(checkedState.attack_range) data = (data.filter(pokemon => 
          pokemon.base.Attack >= checkedState.attack_range[0] && pokemon.base.Attack <= checkedState.attack_range[1]
          ))
        
        return data
      })
      .then(res => {
        setPokemonList(res)
      })
      .catch(err => console.log("err", err))
  }, [checkedState])



  const indexOfLastRecord = currentPage * pokemonsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstRecord, indexOfLastRecord)
  const numberOfPages = Math.ceil(pokemons.length / pokemonsPerPage);

  return (
    <>
      < Page currentPokemons={currentPokemons} currentPage={currentPage} setPokemons={setPokemons}/>
      < Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default FilteredPagination