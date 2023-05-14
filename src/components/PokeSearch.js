// import React, { useState } from 'react'
import React, { useState } from 'react'
import '../App.css'

import { NamesDataList } from './namesDataList'

export const PokeSearch = () => {

    const [pokeName, setPokeName] = useState('')
    const [pokeInfo, setPokeInfo] = useState({})
    const [pokeImg, setPokeImg] = useState('')
    const [pokeMoves, setPokeMoves] = useState([])
    const [pokeFlavorText, setPokeFlavorText] = useState('')
    const [flavorToggle, setFlavorToggle] = useState(false)

    const getFour = (arr) => {
        const four = []
        while (four.length < arr.length) {
            const ind = Math.floor(Math.random() * arr.length)
            if (four.includes(ind) === false) {
                four.push(ind)
            }
            if (four.length === 4) {
                break
            }
        }
        return four
    }
    

    const getPokemon = async (name) => {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        const myJson = await result.json()  
        setPokeInfo(myJson)
        setPokeImg(myJson.sprites.front_default)
        const four = getFour(myJson.moves)
        setPokeMoves(four.map(num => myJson.moves[num].move.name))
        setFlavorToggle(false)
        setPokeFlavorText('')
        console.log(myJson.id)
    }

    const getFlavorText = async () => {
        try {
            if (pokeFlavorText.length > 1) {
                setPokeFlavorText('')
                setFlavorToggle(false)
            } else {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeInfo.id}/`)
                const myJson = await result.json()
                setPokeFlavorText(myJson.flavor_text_entries[1].flavor_text)
            }
            setFlavorToggle(true)
            
        } catch (error) {
            setPokeFlavorText(`Unfortunately, there isn't very much information about ${pokeInfo.name} yet`)
            setFlavorToggle(true)
        }
    }

   return(
    <div>
        {pokeInfo.name ? <></> : <h1>Welcome to Poké Info</h1>}
        <form onSubmit={(e) => {
            e.preventDefault()
            setPokeFlavorText('')
            getPokemon(pokeName)}}>
            <input 
                type='text' 
                name='pokeName' 
                id='pokeName'
                placeholder='...type a Pokémon name' 
                value={pokeName} 
                list='pokeNames'
                onChange={(e) => setPokeName(e.target.value)} 
            />
            <NamesDataList name={pokeName}/>
        </form>
        <section>
            <h2>{pokeInfo.name ? pokeInfo.name : ''}</h2>
            {pokeInfo.name ? <p>Some moves {pokeInfo.name}s can learn are</p> : <></>}
            {pokeInfo.moves ? pokeMoves.map((move) => <p key={move}>{move}</p>) : <></>}
            {pokeInfo.name ? <img alt='' id='pokeId' src={pokeImg} /> : <></>}
        </section>
        <section>
            {pokeInfo.name ? <button onClick={getFlavorText}>{pokeFlavorText.length === 0 ? `For more information about ${pokeInfo.name} click here!` : 'Learned enough?'}</button> : <></>}
            {flavorToggle ? <p>{pokeFlavorText}</p> : <></>}
        </section>
    </div>
   )
}
