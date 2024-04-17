import { useEffect, useReducer, useState } from 'react'
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

interface boxesstate {
  states: BoxMove[]
  activeplayer: boolean
}
interface boardprops {
  n: number
  handleWinner: React.Dispatch<React.SetStateAction<string>>
}
const NxNBoard = (props: boardprops) => {
  const initialBoxStates: boxesstate = {
    states: Array(props.n ** 2).fill(BoxMove.None),
    activeplayer: true
  }
  const [boxesState, dispatch]: [boxesstate, React.Dispatch<Partial<action>>] =
    useReducer(BoxesReducer, initialBoxStates)

  function handleBoxChange(boxnumber: string) {
    dispatch({
      type: 'changed',
      boxnumber: boxnumber,
      handleWinner: props.handleWinner
    })
  }
  function handleBoxReset() {
    dispatch({
      type: 'reset',
      boxesstate: initialBoxStates
    })
  }

  let idx2: number = -1
  useEffect(() => {
    console.log(boxesState.activeplayer ? 'player 1' : 'player 2')
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
      {boxesState.states.map((st: BoxMove) => {
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
  boxesstate: boxesstate
  handleWinner: React.Dispatch<React.SetStateAction<string>>
}
function BoxesReducer(boxesstate: boxesstate, action: Partial<action>) {
  const boxStates = boxesstate.states

  switch (action.type) {
    case 'changed': {
      let i: number = -1
      let changeOccured: boolean = false
      const temp: BoxMove[] = boxStates.map((st: BoxMove) => {
        i++
        if (String(i) == action.boxnumber && st == -1) {
          changeOccured = true
          return boxesstate.activeplayer ? BoxMove.P1 : BoxMove.P2
        } else {
          return st
        }
      })
      if (EvaluateGame(temp, Number(action.boxnumber))) {
        console.log(
          (boxesstate.activeplayer ? 'Player O ' : 'Player X ') + ' won'
        )
        if (action.handleWinner)
          boxesstate.activeplayer
            ? action.handleWinner('Player O')
            : action.handleWinner('Player X')
      }
      return {
        states: temp,
        activeplayer: changeOccured
          ? !boxesstate.activeplayer
          : boxesstate.activeplayer
      }
    }
    case 'reset': {
      return action.boxesstate
    }
    default: {
      console.log('default called')
      return boxesstate
    }
  }
}

export default GameBoard
