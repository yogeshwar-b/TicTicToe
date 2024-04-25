import GameBoard from './components/GameBoard'

function App() {
  return (
    <div
      style={{
        display: 'grid',
        placeContent: 'center',
        justifyItems: 'center',
        gap: '2rem'
      }}
    >
      <div style={{ fontSize: '3rem' }}>TicTicToe</div>
      <GameBoard></GameBoard>
    </div>
  )
}

export default App
