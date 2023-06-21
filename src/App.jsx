import { useState } from 'react'
import { categories } from './utils'
import { selectedEmojis } from './utils'
import { MyForm } from './components/MyForm'
import { Board } from './components/Board'

const initialState={
  size: 0,
  category: '',
  remaining: null,
  score: 0,
  won: false,
  running: false,
}

function App() {
  const [ gameState, setGameState] = useState(initialState)
  const [emojis, setEmojis] = useState([]) 

  console.log(gameState, emojis)
  return (
    <div className='container'>
      
      <div className="flex-col items-center max-w-[1200px] mx-auto">
        <div className='h1'>Memory game</div>
        <MyForm setGameState = {setGameState} setEmojis={setEmojis}/>
        {emojis.length>0 && <Board emojis = {emojis} setEmojies = {setEmojis} gameState = {gameState} setGameState = {setGameState}/>}
      </div>
    </div>
  )
}

export default App
