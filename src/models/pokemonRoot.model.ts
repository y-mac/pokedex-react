import {pokemonResult} from './pokemonResult';

export interface pokemonRoot {
    count: number
    next: string
    previous: any
    results: pokemonResult[]
}