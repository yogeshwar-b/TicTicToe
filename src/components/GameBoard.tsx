import { useEffect, useReducer, useRef, useState } from 'react'
import { EvaluateGame } from '../utils/EvaluateGame'
import { BoxMove } from '../../models/boardenums'

const numberofrows: number = 3
const boxsize: string = '100px'

const GameBoard = () => {
  const [winner, SetWinner] = useState('')
  return (
    <div>
      {winner == '' ? <></> : <div>WINNER - {winner}</div>}
      <NxNBoard n={numberofrows} handleWinner={SetWinner}></NxNBoard>
    </div>
  )
}

interface boardprops {
  n: number
  handleWinner: React.Dispatch<React.SetStateAction<string>>
}
const NxNBoard = (props: boardprops) => {
  const initialBoxStates: BoxMove[] = Array(props.n ** 2).fill(BoxMove.None)
  const [boxesState, dispatch] = useReducer(BoxesReducer, initialBoxStates)
  let PlayerRef = useRef(true) //True - P1 , False - P2

  function handleBoxChange(boxnumber: string) {
    dispatch({
      type: 'changed',
      boxnumber: boxnumber,
      PlayerRef: PlayerRef,
      handleWinner: props.handleWinner
    })
  }
  function handleBoxReset() {
    dispatch({
      type: 'reset',
      BoxState: initialBoxStates
    })
  }

  let idx2: number = -1

  useEffect(() => {
    PlayerRef.current = !PlayerRef.current
  })
  return (
    /**
     * @todo - change to css file
     */
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(' + numberofrows + ',' + boxsize + ')',
        justifyItems: 'center'
      }}
    >
      {boxesState.map((st: BoxMove) => {
        idx2++
        return (
          <PieceButton
            boxnumber={String(idx2)}
            boxChanged={handleBoxChange}
            boxstate={st}
            key={String(idx2)}
          ></PieceButton>
        )
      })}
    </div>
  )
}

interface piecebuttonprops {
  boxnumber: string
  boxChanged: (boxnumber: string) => void
  boxstate: BoxMove
}
const PieceButton = (props: piecebuttonprops) => {
  return (
    <button
      type='button'
      /**
       * @todo - Change to css file
       */
      style={{ display: 'inline', height: boxsize, width: boxsize }}
      name={String(props.boxnumber)}
      onClick={() => {
        props.boxChanged(String(props.boxnumber))
      }}
    >
      {props.boxstate == BoxMove.None
        ? '-'
        : props.boxstate == BoxMove.P1
        ? 'O'
        : 'X'}
    </button>
  )
}

interface action {
  type: string
  boxnumber: string
  PlayerRef: React.MutableRefObject<boolean>
  BoxState: BoxMove[]
  handleWinner: React.Dispatch<React.SetStateAction<string>>
}
function BoxesReducer(boxStates: BoxMove[], action: Partial<action>) {
  switch (action.type) {
    case 'changed': {
      let i = -1
      let temp: BoxMove[] = boxStates.map((st: BoxMove) => {
        i++
        return String(i) == action.boxnumber
          ? action.PlayerRef?.current
            ? BoxMove.P1
            : BoxMove.P2
          : st
      })
      if (EvaluateGame(temp, Number(action.boxnumber))) {
        console.log(
          (action.PlayerRef?.current ? 'Player O ' : 'Player X ') + ' won'
        )
        if (action.handleWinner)
          action.PlayerRef?.current
            ? action.handleWinner('Player O')
            : action.handleWinner('Player X')
      }
      return temp
    }
    case 'reset': {
      if (action.handleWinner) action.handleWinner('')
      return action.BoxState ? action.BoxState : boxStates
    }
    default: {
      console.log('default called')
      return boxStates
    }
  }
}

export default GameBoard
