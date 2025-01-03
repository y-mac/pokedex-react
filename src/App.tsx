import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PokemonList from './components/PokemonList/PokemonList'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import './App.css'



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<div> Loading... </div>}>
            <PokemonList />
          </Suspense>
        }>
        </Route>
        <Route path="/pokemonList" element={
          <Suspense fallback={<div> Loading... </div>}>
            <PokemonList />
          </Suspense>
        }>
        </Route>
        <Route path="/pokemon/:id" element={
          <Suspense fallback={<div> Loading... </div>}>
            <PokemonDetail />
          </Suspense>
        }>
        </Route> 
      </Routes>
    </>
  )
}

export default App
