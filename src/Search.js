import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
const ariaLabel = { 'aria-label': 'description' };
function Search({ types, checkedState, setCheckedState }) {
  var currentTypes = checkedState.types_array;

  const handleClearFilters = () => {
    window.location.reload(false);
  }

  const handleNameClick = () => {
    setCheckedState({"name" : nameText, "types_array": currentTypes, "health_range": healthValue, "attack_range": attackValue})
  }

  const handleIdClick = () => {
    setCheckedState({"id" : idText, "types_array": currentTypes, "health_range": healthValue, "attack_range": attackValue})
  }

  const handleButtonClick = () => {
    setCheckedState({"types_array": currentTypes, "health_range": healthValue, "attack_range": attackValue});
  }

  const onChangeHandle = (type) => {
    const index = types.current.indexOf(type);
    currentTypes[index] === true ? currentTypes[index] = false : currentTypes[index] = true
  }

  // const [newCheckedState, setNewCheckedState] = React.useState([])
  const [healthValue, setHealthValue] = React.useState([0, 300]);
  const [attackValue, setAttackValue] = React.useState([0, 200]);
  const [nameText, setNameText] = React.useState("")
  const [idText, setIdText] = React.useState("")

  const handleHealthChange = (event, newValue) => {
    setHealthValue(newValue);
  };

  const handleAttackChange = (event, newValue) => {
    setAttackValue(newValue);
  };

  const handleNameTextChange = (event) => {
    setNameText(event.target.value);
  }

  const handleIdTextChange = (event) => {
    setIdText(event.target.value);
  }

  return (
    <div>
      <h1 class="flex justify-center text-xl font-bold bg-black text-white p-3">Search Filters</h1>
      <div class="flex justify-center">
        <div class="mr-5 mt-3 pr-5">
          <div class="mb-10">
          <h1 class="font-bold">Search by Name: </h1>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1.5, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Input placeholder="Pikachu" inputProps={ariaLabel} onChange={handleNameTextChange}/>
          </Box>
          <button class="rounded-lg bg-gray-300 hover:bg-gray-200 active:bg-gray-100 p-2 m-3" onClick={handleNameClick}>Search Name</button>
          </div>
          <div>
          <h1 class="font-bold">Search by ID: </h1>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1.5, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Input placeholder="96" inputProps={ariaLabel} onChange={handleIdTextChange}/>
            
          </Box>
          <button class="rounded-lg bg-gray-300 hover:bg-gray-200 active:bg-gray-100 p-2 m-3" onClick={handleIdClick}>Search ID</button>
          </div>
        </div>
        <div class="mr-5 mt-3 ml-5">
          <h1 class="font-bold">Health Range</h1>
          <div class="flex mt-4">
            <div class="mr-3">{healthValue[0]}</div>
              <Box sx={{ width: 250 }}>
                <Slider
                  min={0}
                  max={300}
                  step={1}
                  value={healthValue}
                  onChange={handleHealthChange}
                  valueLabelDisplay="auto"
                />
              </Box>
            <div class="ml-3">{healthValue[1]}</div>
          </div>
          <h1 class="mt-5 font-bold">Attack Range</h1>
          <div class="flex mt-4">
            <div class="mr-3">{attackValue[0]}</div>
              <Box sx={{ width: 250 }}>
                <Slider
                min={0}
                max={200}
                step={1}
                  value={attackValue}
                  onChange={handleAttackChange}
                  valueLabelDisplay="auto"
                />
              </Box>
            <div class="ml-3">{attackValue[1]}</div>
          </div>
        </div>
        <div class="w-1/4 m-3 ml-5">
        <h1 class="font-bold mb-2">Types Filter</h1>
          <div class="grid grid-cols-3 gap-2">
            {
              types.current.map(type => {
                return (
                  <span class="" key={type}>
                    <input type="checkbox" name="pokeTypes" value={type} id={type} onChange={() => { onChangeHandle(type) }} />
                    <label class="ml-2" htmlFor={type}>{type}</label>
                    <br />
                  </span>
                )
              })
            }
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-4">
          <button class="rounded-lg bg-black hover:bg-gray-600 active:bg-gray-500 text-white p-5 m-4" onClick={handleButtonClick}>
            Submit
          </button>
          <button class="rounded-lg bg-black hover:bg-gray-600 active:bg-gray-500 text-white p-5 m-4" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
    </div>
  )
}

export default Search