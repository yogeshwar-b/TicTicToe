export enum BoxMove {
  None = -1, // Box default state
  P1, // P1 pressed the box
  P2 // P2 pressed the box
}

export class Box {
  BoxMove: BoxMove
  WillPop: boolean
  constructor({
    BoxMove: _BoxMove,
    WillPop: _WillPop = false
  }: {
    BoxMove: BoxMove
    WillPop: boolean
  }) {
    this.BoxMove = _BoxMove
    this.WillPop = _WillPop
  }
}
