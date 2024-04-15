import { useState } from 'react'

const numberofrows = 5

const GameBoard = () => {
  return (
    <div>
      <NxNBoard n={numberofrows}></NxNBoard>
    </div>
  )
}

interface boardprops {
  n: number
}

const NxNBoard = (props: boardprops) => {
  let idx = 0
  return (
    <div>
      {Array.from(Array(props.n)).map(() => {
        return (
          <div>
            {Array.from(Array(props.n)).map(() => {
              idx++
              return <PieceButton boxnumber={idx}></PieceButton>
            })}
          </div>
        )
      })}
    </div>
  )
}

interface piecebuttonprops {
  boxnumber: number
}
const PieceButton = (props: piecebuttonprops) => {
  const [btnclick, changebtnclick] = useState(false)
  return (
    <button
      type='button'
      style={{ display: 'inline', height: '100px', width: '100px' }}
      name={String(props.boxnumber)}
      onClick={() => {
        console.log('changed ' + String(props.boxnumber))
        changebtnclick(!btnclick)
      }}
    >
      {btnclick ? 'X' : 'O'}
    </button>
  )
}

export default GameBoard
