import './ArcadeButton.css'
import { BoxMove } from '../../../models/boardenums'

/**
 *
 * Maintains clicked state
 */
interface ArcadeButtonProps {
  // isDisabled: boolean
  boxNumber: string
  pressedEvent: (boxnumber: string) => void
  textInside: string
  boxstate: BoxMove
}
const ArcadeButton = (props: ArcadeButtonProps) => {
  // const [btnstate, changebtnstate] = useState('default') // default,pressed,released
  var cssclass = 'btn-fg btn-fg-color-default'
  return (
    <button
      className={
        'btn-bg' +
        ' ' +
        (props.boxstate != BoxMove.None ? '' : 'btn-bg-pressed')
      }
      onMouseDown={() => {
        if (props.boxstate == BoxMove.None) {
          props.pressedEvent(props.boxNumber)
        }
      }}
    >
      <span
        className={
          cssclass +
          ' ' +
          (props.boxstate != BoxMove.None
            ? props.boxstate == BoxMove.P1
              ? 'btn-fg-pos-pressed orange-colors'
              : 'btn-fg-pos-pressed green-colors'
            : 'btn-fg-pos-default default-colors')
        }
      >
        <div
          className={
            props.boxstate != BoxMove.None
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
