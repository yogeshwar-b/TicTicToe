import { useReducer } from 'react'
import { EvaluateGame } from '../utils/EvaluateGame'
import { BoxMove } from '../../models/boardenums'
import ArcadeButton from './ArcadeButton/ArcadeButton'
import Text3dButton from './Text3DButton/Text3dButton'
import GameOver from './GameOver'

const numberofrows: number = 3
const boxsize: string = '100px'
const gameplaylimit: number = 5

interface boxesstate {
  states: BoxMove[]
  activeplayer: boolean
  winner: string
  gameplay: string[]
}

const GameBoard = () => {
  const initialboxesState: boxesstate = {
    states: Array(numberofrows ** 2).fill(BoxMove.None),
    activeplayer: true,
    winner: '',
    gameplay: []
  }
  const [boxesState, dispatch]: [boxesstate, React.Dispatch<Partial<action>>] =
    useReducer(BoxesReducer, initialboxesState)

  function handleBoxChange(boxnumber: string) {
    dispatch({
      type: 'changed',
      boxnumber: boxnumber
    })
  }
  function handleBoxReset() {
    dispatch({
      type: 'reset',
      boxesstate: initialboxesState
    })
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: '3rem' }}>
      <Text3dButton
        OnButtonClick={() => {
          console.log('button clicked')
          handleBoxReset()
        }}
      />
      {boxesState.winner != '' ? (
        <GameOver winner={boxesState.winner}></GameOver>
      ) : (
        ''
      )}
      <NxNBoard
        n={numberofrows}
        boxesState={boxesState}
        handleBoxChange={handleBoxChange}
      ></NxNBoard>
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

  return (
    /**
     * @todo - change to css file
     */
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(' + numberofrows + ',' + boxsize + ')',
        justifyItems: 'center',
        rowGap: '1rem'
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
            winner={props.boxesState.winner}
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
  winner: string
}
const PieceButton = (props: piecebuttonprops) => {
  function handleBoxChanged(boxnumber: string) {
    props.boxChanged(boxnumber)
  }

  return (
    <ArcadeButton
      /**
       * @todo - Change to css file
       */
      boxNumber={String(props.boxnumber)}
      pressedEvent={handleBoxChanged}
      boxstate={props.boxstate}
      textInside={
        props.boxstate == BoxMove.None
          ? '-'
          : props.boxstate == BoxMove.P1
          ? 'O'
          : 'X'
      }
    />
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
      let winner = boxesstate.winner
      let gamepl = boxesstate.gameplay.map((st) => {
        return st
      }) //deepcopy
      let changeOccured: boolean = false
      const temp: BoxMove[] = boxStates.map((st: BoxMove) => {
        i++
        if (String(i) == action.boxnumber && st == -1) {
          changeOccured = true
          if (gamepl[gamepl.length - 1] != action.boxnumber) {
            gamepl.push(action.boxnumber)
          }
          return boxesstate.activeplayer ? BoxMove.P1 : BoxMove.P2
        } else {
          return st
        }
      })
      if (changeOccured) {
        if (EvaluateGame(temp, Number(action.boxnumber))) {
          console.log(
            (boxesstate.activeplayer ? 'Player O ' : 'Player X ') + ' won'
          )
          winner = boxesstate.activeplayer ? 'Player O' : 'Player X'
        }
        if (gamepl.length > gameplaylimit) {
          temp[Number(gamepl.shift())] = BoxMove.None
        }
      }
      return {
        states: temp,
        activeplayer: changeOccured
          ? !boxesstate.activeplayer
          : boxesstate.activeplayer,
        winner: winner,
        gameplay: gamepl
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
