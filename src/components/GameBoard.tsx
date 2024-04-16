import { useEffect, useReducer } from 'react'

const numberofrows: number = 3
const boxsize: string = '100px'

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
  let initialBoxStates: boolean[] = Array(props.n ** 2).fill(false)
  const [boxesState, dispatch] = useReducer(BoxesReducer, initialBoxStates)
  function handleBoxChange(boxnumber: string) {
    dispatch({ type: 'changed', boxnumber: boxnumber })
  }
  let idx2: number = 0
  return (
    /**
     * @todo - change to css file
     */
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,' + boxsize + ')',
        justifyItems: 'center'
      }}
    >
      {boxesState.map((st: boolean) => {
        idx2++
        return (
          <PieceButton
            boxnumber={String(idx2)}
            boxChanged={handleBoxChange}
            boxstate={st}
          ></PieceButton>
        )
      })}
    </div>
  )
}

interface piecebuttonprops {
  boxnumber: string
  boxChanged: (boxnumber: string) => void
  boxstate: boolean
}
const PieceButton = (props: piecebuttonprops) => {
  // const [btnclick, changebtnclick] = useState(false)
  useEffect(() => {
    // console.log('rendered ' + props.boxnumber)
  })
  return (
    <button
      type='button'
      /**
       * @todo - Change to css file
       */
      style={{ display: 'inline', height: boxsize, width: boxsize }}
      name={String(props.boxnumber)}
      onClick={() => {
        console.log('changed ' + String(props.boxnumber))
        props.boxChanged(String(props.boxnumber))
        // changebtnclick(!btnclick)
      }}
    >
      {props.boxstate ? 'X' : 'O'}
    </button>
  )
}

interface action {
  type: string
  boxnumber: string
}
function BoxesReducer(boxStates: boolean[], action: Partial<action>) {
  switch (action.type) {
    case 'changed': {
      // console.log('changed called for ' + action.boxnumber)
      let i = 0
      return boxStates.map((st: boolean) => {
        i++
        return String(i) == action.boxnumber ? !st : st
      })
    }
    default: {
      console.log('default called')
      return [...boxStates]
    }
  }
}

export default GameBoard
