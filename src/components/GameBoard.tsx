import { useEffect, useReducer, useState } from 'react'
import { EvaluateGame } from '../utils/EvaluateGame'
import { BoxMove } from '../../models/boardenums'

const numberofrows: number = 3
const boxsize: string = '100px'

interface boxesstate {
  states: BoxMove[]
  activeplayer: boolean
  winner: string
}

const GameBoard = () => {
  // const [winner, SetWinner] = useState('')
  const initialboxesState: boxesstate = {
    states: Array(numberofrows ** 2).fill(BoxMove.None),
    activeplayer: true,
    winner: ''
  }
  const [boxesState, dispatch]: [boxesstate, React.Dispatch<Partial<action>>] =
    useReducer(BoxesReducer, initialboxesState)

  function handleBoxChange(boxnumber: string) {
    dispatch({
      type: 'changed',
      boxnumber: boxnumber
      // handleWinner: props.handleWinner
    })
  }
  function handleBoxReset() {
    dispatch({
      type: 'reset',
      boxesstate: initialboxesState
    })
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: '1rem' }}>
      {boxesState.winner == '' ? (
        <></>
      ) : (
        <div>WINNER - {boxesState.winner}</div>
      )}
      <NxNBoard
        n={numberofrows}
        boxesState={boxesState}
        handleBoxChange={handleBoxChange}
      ></NxNBoard>
      <button
        onClick={() => {
          handleBoxReset()
        }}
        style={{ fontSize: '1.5rem' }}
      >
        Reset
      </button>
    </div>
  )
}

interface boardprops {
  n: number
  boxesState: boxesstate
  handleBoxChange: (boxnumber: string) => void
}
const NxNBoard = (props: boardprops) => {
  let idx2: number = -1
  useEffect(() => {
    console.log(props.boxesState.activeplayer ? 'player 1' : 'player 2')
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
      {props.boxesState.states.map((st: BoxMove) => {
        idx2++
        return (
          <PieceButton
            boxnumber={String(idx2)}
            boxChanged={props.handleBoxChange}
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
      let winner = ''
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
        winner = boxesstate.activeplayer ? 'Player O' : 'Player X'
      }
      return {
        states: temp,
        activeplayer: changeOccured
          ? !boxesstate.activeplayer
          : boxesstate.activeplayer,
        winner: winner
      }
    }
    case 'reset': {
      return action.boxesstate ? action.boxesstate : boxesstate
    }
    default: {
      console.log('default called')
      return boxesstate
    }
  }
}

export default GameBoard
