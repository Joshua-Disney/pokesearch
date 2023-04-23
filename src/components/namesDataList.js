import React from 'react'
import { PokeNames } from './PokeNames'

export const NamesDataList = (props) => {

    return (
        <datalist id='pokeNames'>
            {PokeNames.map((name) => {
                if(name[0] === props.name[0]) return <option key={name} value={name} />})}
        </datalist>
    )
}