import './App.css'
import { useState, useEffect } from 'react'

export default function App () {
  const [team, setTeam] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const pokemonNames = ['bulbasaur', 'vulpix', 'abra', 'gastly', 'poliwag', 'sandshrew', 'machop', 'dratini', 'oddish', 'meowth', 'cubone', 'shellder']
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        const results = await Promise.all(
          pokemonNames.map(async poke => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}/`)
            if(!response.ok) {
              throw new Error('error: ' + response.status)
            }
            return await response.json()
          })
        )
       setTeam(results)
      }
      catch (error){
        setError(error.message)
      }
      finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  if (loading) return <p>...Loading</p>

  if (error) return <p>Error: {error}</p>

  return (
    <>
    <h1>Pokemon Memory Game</h1>
    <p>Get points by clicking on an image but don't click on any more than once!</p>
    <div className="cards-container">
      {team.map(pokemon => 
        <Card key={pokemon.id} pokemon={pokemon} />
      )}
    </div>
    </>
  )
}

function Card ({pokemon}) {
  return (
    <button className='card' style={cardStyle}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} style={img}/>
      <p style={cardPara}>{pokemon.name.toUpperCase()}</p>
    </button>
  )
}

const cardStyle = {
    width: '280px',
    height: '350px',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: '15px',
    fontSize: '23px',
    fontFamily: "Galada",
    margin: '10px',
}

const img = {
  height: '200px'
}

const cardPara = {
  color: 'black'
}