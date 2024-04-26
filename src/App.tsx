import GameBoard from './components/GameBoard'
import Text3dButton from './components/Text3DButton/Text3dButton'

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
      <Text3dButton
        OnButtonClick={() => {
          console.log('button clicked')
        }}
      />
      <GameBoard></GameBoard>
    </div>
  )
}

export default App
