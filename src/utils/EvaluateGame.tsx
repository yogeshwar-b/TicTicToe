import { Box } from '../../models/boardenums'

let match = ''
let side = 0
export function EvaluateGame(BoxStates: Box[], idx: number): boolean {
  side = Math.sqrt(BoxStates.length)
  //console.log(side)
  match = String(BoxStates[idx].BoxMove)
  const i = Math.floor(idx / side) //Row number
  const j = idx % side //Col number
  if (i == j || i == side - 1 - j) {
    //box on diagonal
    if (CheckCorner0(BoxStates) || CheckCornerN(BoxStates)) {
      //console.log('corner matched')
      return true
    }
  }
  return CheckRows(idx, BoxStates) || CheckCols(idx, BoxStates) ? true : false
}

function CheckRows(idx: number, BoxStates: Box[]): boolean {
  //console.log('row check')
  for (let j = 0; j < side; j++) {
    //console.log(Math.floor(idx / side) + j)
    if (
      String(BoxStates[Math.floor(idx / side) * side + j].BoxMove) !=
      String(match)
    ) {
      return false
    }
  }
  //console.log('row matched')

  return true
}

function CheckCols(idx: number, BoxStates: Box[]): boolean {
  //console.log('col check ' + side)
  for (let i = 0; i < side; i++) {
    //console.log((idx % side) + side * i)
    if (String(BoxStates[(idx % side) + side * i].BoxMove) != String(match)) {
      return false
    }
  }
  //console.log('col matched')

  return true
}

function CheckCorner0(BoxStates: Box[]): boolean {
  //Check ↘ diagonal
  for (let i = 0; i < side; i++) {
    if (String(BoxStates[i * side + i].BoxMove) !== String(match)) {
      return false
    }
  }
  //console.log('corner1')
  return true
}
function CheckCornerN(BoxStates: Box[]): boolean {
  //Check ↙ diagonal
  for (let i = 0; i < side; i++) {
    if (
      String(BoxStates[i * side + (side - 1 - i)].BoxMove) !== String(match)
    ) {
      return false
    }
  }
  //console.log('corner2')
  return true
}
