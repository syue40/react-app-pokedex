import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import FilteredPagination from './FilteredPagination'
import PokemonProfile from './PokemonProfile';
import Search from './Search'
import axios from 'axios'


function Main() {
  const [checkedState, setCheckedState] = useState({
    "types_array": [],
    "attack_range": [],
    "health_range": []
  });
  const [pokemon, setPokemons] = useState("")
  const types = useRef([])

  useEffect(() => {
    async function getTypes() {
      const result = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json');
      types.current = result.data.map(type => type.english);
      setCheckedState(
        {
          "types_array": new Array(result.data.length).fill(false)
        }
        )
    }
    getTypes();
  }, [])

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route 
      path="/"
      element={
          <>
          <Search types={types} checkedState={checkedState} setCheckedState={setCheckedState} />
          <FilteredPagination types={types} checkedState={checkedState} setPokemons={setPokemons}/>
          </>
          }
        />
      <Route
        path="/pokemon/*" 
        element={
          <PokemonProfile pokemon={pokemon}/>
        }/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Main />
);
