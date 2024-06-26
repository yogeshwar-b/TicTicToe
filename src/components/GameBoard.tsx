import { useReducer } from 'react'
import { EvaluateGame } from '../utils/EvaluateGame'
import { BoxMove, Box } from '../../models/boardenums'
import ArcadeButton from './ArcadeButton/ArcadeButton'
import Text3dButton from './Text3DButton/Text3dButton'
import GameOver from './GameOver'

const numberofrows: number = 3
const boxsize: string = '140px'
const gameplaylimit: number = 5

interface boxesstate {
  states: Box[]
  activeplayer: boolean
  winner: string
  gameplay: string[]
}

const GameBoard = () => {
  const initialboxesState: boxesstate = {
    states: Array(numberofrows ** 2).fill({
      BoxMove: BoxMove.None,
      WillPop: false
    }),
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
        columnGap: '4rem',
        height: '75vh'
      }}
    >
      {props.boxesState.states.map((st: Box) => {
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
  boxstate: Box
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
      GameOver={props.winner != ''}
      boxNumber={String(props.boxnumber)}
      pressedEvent={handleBoxChanged}
      boxstate={props.boxstate}
      textInside={
        props.boxstate.BoxMove == BoxMove.None
          ? '-'
          : props.boxstate.BoxMove == BoxMove.P1
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
      const gamepl = boxesstate.gameplay.map((st) => {
        return st
      }) //deepcopy
      let changeOccured: boolean = false
      const temp: Box[] = boxStates.map((st: Box) => {
        i++
        if (String(i) == action.boxnumber && st.BoxMove == -1) {
          changeOccured = true
          if (gamepl[gamepl.length - 1] != action.boxnumber) {
            gamepl.push(action.boxnumber)
          }
          return boxesstate.activeplayer
            ? { BoxMove: BoxMove.P1, WillPop: st.WillPop }
            : { BoxMove: BoxMove.P2, WillPop: st.WillPop }
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
        if (gamepl.length >= gameplaylimit) {
          if (gamepl.length > gameplaylimit) {
            //@todo - need a better way of doing this
            temp[Number(gamepl.shift())] = {
              BoxMove: BoxMove.None,
              WillPop: false
            }
          }
          temp[Number(gamepl[0])].WillPop = true
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
