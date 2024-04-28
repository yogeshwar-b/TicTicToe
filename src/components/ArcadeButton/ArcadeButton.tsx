import './ArcadeButton.css'
import { Box, BoxMove } from '../../../models/boardenums'

/**
 *
 * Maintains clicked state
 */
interface ArcadeButtonProps {
  // isDisabled: boolean
  boxNumber: string
  pressedEvent: (boxnumber: string) => void
  textInside: string
  boxstate: Box
}
const ArcadeButton = (props: ArcadeButtonProps) => {
  // const [btnstate, changebtnstate] = useState('default') // default,pressed,released
  const cssclass = 'btn-fg btn-fg-color-default'
  return (
    <button
      className={
        'btn-bg' +
        ' ' +
        (props.boxstate.BoxMove != BoxMove.None ? '' : 'btn-bg-pressed')
      }
      onMouseDown={() => {
        if (props.boxstate.BoxMove == BoxMove.None) {
          props.pressedEvent(props.boxNumber)
        }
      }}
    >
      <span
        className={
          cssclass +
          ' ' +
          (props.boxstate.BoxMove != BoxMove.None
            ? props.boxstate.BoxMove == BoxMove.P1
              ? 'btn-fg-pos-pressed orange-colors'
              : 'btn-fg-pos-pressed green-colors'
            : 'btn-fg-pos-default default-colors') +
          ' ' +
          (props.boxstate.WillPop ? 'btn-pop red-colors' : '')
        }
      >
        <div
          className={
            props.boxstate.BoxMove != BoxMove.None
              ? 'txt-pos-pressed'
              : 'txt-pos-default'
          }
        >
          {props.textInside}
        </div>
      </span>
    </button>
  )
}

export default ArcadeButton
