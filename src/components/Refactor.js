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
        this.state.pokeInfo = myJson
        this.state.pokeImg = myJson.sprites.front_default 
        // setPokeInfo(myJson)
        // setPokeImg(myJson.sprites.front_default)
        const four = this.getFour(myJson.moves)
        this.state.pokeMoves = four.map(num => myJson.moves[num].move.name)
        // setPokeMoves(four.map(num => myJson.moves[num].move.name))
        this.state.flavorToggle = false
        this.state.pokeFlavorText = ''
        // setFlavorToggle(false)
        // setPokeFlavorText('')
    }

    async getFlavorText() {
        if (this.state.pokeFlavorText.length > 1) {
            this.state.pokeFlavorText = ''
            this.state.flavorToggle = false
            // setPokeFlavorText('')
            // setFlavorToggle(false)
            console.log('turning off')
        } else {
            const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.state.pokeInfo.id}/`)
            const myJson = await result.json()
            this.state.pokeFlavorText = myJson.flavor_text_entries[1].flavor_text
            this.state.flavorToggle = true
            // setPokeFlavorText(myJson.flavor_text_entries[1].flavor_text)
            // setFlavorToggle(true)
            console.log('turning on')
        }
    }

    render() {
        return(
            <div>
                {this.state.pokeInfo.name ? <></> : <h1>Welcome to Poké Info</h1>}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.state.pokeFlavorText = ''
                    // setPokeFlavorText('')
                    this.getPokemon(this.state.pokeName)}}>
                    <input 
                        type='text' 
                        name='pokeName' 
                        id='pokeName'
                        placeholder='...type a Pokémon name' 
                        value={this.state.pokeName} 
                        list='pokeNames'
                        onChange={(event) => {
                            console.log("attempt to type")
                            console.log("pokeName: ", this.state.pokeName)
                            this.state = {...this.state, pokeName: event.target.value}
                        }}
                        // onChange={(e) => setPokeName(e.target.value)} 
                    />
                    <NamesDataList name={this.state.pokeName}/>
                </form>
                <section>
                    <h2>{this.state.pokeInfo.name ? this.state.pokeInfo.name : ''}</h2>
                    {this.state.pokeInfo.name ? <p>Some moves {this.state.pokeInfo.name}s can learn are</p> : <></>}
                    {this.state.pokeInfo.moves ? this.state.pokeMoves.map((move) => <p key={move}>{move}</p>) : <></>}
                    {this.state.pokeInfo.name ? <img alt='' id='pokeId' src={this.state.pokeImg} /> : <></>}
                </section>
                <section>
                    {this.state.pokeInfo.name ? <button onClick={this.getFlavorText}>{this.state.pokeFlavorText.length === 0 ? `For more information about ${this.state.pokeInfo.name} click here!` : 'Learned enough?'}</button> : <></>}
                    {this.state.flavorToggle ? <p>{this.state.pokeFlavorText.length > 0 ? this.state.pokeFlavorText : `Unfortunately, there isn't very much information about ${this.state.pokeInfo.name} yet`}</p> : <></>}
                </section>
            </div>
        )
    }
}
