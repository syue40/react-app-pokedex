import React from 'react'
import Pokemon from './Pokemon'
function page({ currentPokemons, currentPage, setPokemons }) {
  return (
    <div>
      <h1 class="flex justify-center mt-5 mb-10">
        Page Number: {currentPage}
      </h1>
      <div className="pokemon-list">
      {currentPokemons.length > 0 ? 
        <div className="pokemon-list">
          {
            currentPokemons.map(item => {
              return <Pokemon key={item.id} pokemon={item} setPokemons={setPokemons}/>
            })
          }
        </div> : 
        <div><h1 class="text-xl font-bold">No Results</h1></div>}
      </div>
    </div>
  )
}

export default page