var match = ''
var side = 0
export function EvaluateGame(BoxStates: boolean[], idx: number): boolean {
  side = Math.sqrt(BoxStates.length)
  console.log(side)
  match = String(BoxStates[idx])
  let i = Math.floor(idx / side) //Row number
  let j = idx % side //Col number
  if (i == j || i == side - 1 - j) {
    //box on diagonal
    if (CheckCorner0(BoxStates) || CheckCornerN(BoxStates)) {
      console.log('corner matched')
      return true
    }
  }
  return CheckRows(idx, BoxStates) || CheckCols(idx, BoxStates) ? true : false
}

function CheckRows(idx: number, BoxStates: boolean[]): boolean {
  console.log('row check')
  for (let j = 0; j < side; j++) {
    console.log(Math.floor(idx / side) + j)
    if (String(BoxStates[Math.floor(idx / side) * side + j]) != String(match)) {
      return false
    }
  }
  console.log('row matched')

  return true
}

function CheckCols(idx: number, BoxStates: boolean[]): boolean {
  console.log('col check ' + side)
  for (let i = 0; i < side; i++) {
    console.log((idx % side) + side * i)
    if (String(BoxStates[(idx % side) + side * i]) != String(match)) {
      return false
    }
  }
  console.log('col matched')

  return true
}

function CheckCorner0(BoxStates: boolean[]): boolean {
  //Check ↘ diagonal
  for (let i = 0; i < side; i++) {
    if (String(BoxStates[i * side + i]) !== String(match)) {
      return false
    }
  }
  console.log('corner1')
  return true
}
function CheckCornerN(BoxStates: boolean[]): boolean {
  //Check ↙ diagonal
  for (let i = 0; i < side; i++) {
    if (String(BoxStates[i * side + (side - 1 - i)]) !== String(match)) {
      return false
    }
  }
  console.log('corner2')
  return true
}
