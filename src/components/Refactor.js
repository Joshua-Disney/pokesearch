import React from 'react'
import '../App.css'

import { NamesDataList } from './namesDataList'

export class Refactor extends React.Component {
    constructor() {
        super()
        this.state = {
            pokeName: '',
            pokeInfo: {},
            pokeImg: '',
            pokeMoves: [],
            pokeFlavorText: '',
            flavorToggle: false
        }
    }

    getFour(arr) {
        console.log('arr: ', arr)
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

    async getPokemon(name) {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        const myJson = await result.json()  
        state.pokeInfo = myJson
        state.pokeImg = myJson.sprites.front_default 
        // setPokeInfo(myJson)
        // setPokeImg(myJson.sprites.front_default)
        const four = getFour(myJson.moves)
        state.pokeMoves = four.map(num => myJson.moves[num].move.name)
        // setPokeMoves(four.map(num => myJson.moves[num].move.name))
        state.flavorToggle = false
        state.pokeFlavorText = ''
        // setFlavorToggle(false)
        // setPokeFlavorText('')
    }

    async getFlavorText() {
        if (state.pokeFlavorText.length > 1) {
            state.pokeFlavorText = ''
            state.flavorToggle = false
            // setPokeFlavorText('')
            // setFlavorToggle(false)
            console.log('turning off')
        } else {
            const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${state.pokeInfo.id}/`)
            const myJson = await result.json()
            state.pokeFlavorText = myJson.flavor_text_entries[1].flavor_text
            state.flavorToggle = true
            // setPokeFlavorText(myJson.flavor_text_entries[1].flavor_text)
            // setFlavorToggle(true)
            console.log('turning on')
        }
    }

    render() {
        return(
            <div>
                {state.pokeInfo.name ? <></> : <h1>Welcome to Poké Info</h1>}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    state.pokeFlavorText = ''
                    // setPokeFlavorText('')
                    getPokemon(state.pokeName)}}>
                    <input 
                        type='text' 
                        name='pokeName' 
                        id='pokeName'
                        placeholder='...type a Pokémon name' 
                        value={state.pokeName} 
                        list='pokeNames'
                        onChange={(event) => {
                            console.log("attempt to type")
                            console.log("pokeName: ", state.pokeName)
                            state = {...state, pokeName: event.target.value}
                        }}
                        // onChange={(e) => setPokeName(e.target.value)} 
                    />
                    <NamesDataList name={state.pokeName}/>
                </form>
                <section>
                    <h2>{state.pokeInfo.name ? state.pokeInfo.name : ''}</h2>
                    {state.pokeInfo.name ? <p>Some moves {state.pokeInfo.name}s can learn are</p> : <></>}
                    {state.pokeInfo.moves ? state.pokeMoves.map((move) => <p key={move}>{move}</p>) : <></>}
                    {state.pokeInfo.name ? <img alt='' id='pokeId' src={state.pokeImg} /> : <></>}
                </section>
                <section>
                    {state.pokeInfo.name ? <button onClick={getFlavorText}>{state.pokeFlavorText.length === 0 ? `For more information about ${state.pokeInfo.name} click here!` : 'Learned enough?'}</button> : <></>}
                    {state.flavorToggle ? <p>{state.pokeFlavorText.length > 0 ? state.pokeFlavorText : `Unfortunately, there isn't very much information about ${state.pokeInfo.name} yet`}</p> : <></>}
                </section>
            </div>
        )
    }
}
