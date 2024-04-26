import './Text3dButton.css'

interface Text3dButtonProps {
  // ButtonText: string
  OnButtonClick: () => void //#change this if your method is different
}

const Text3dButton = (props: Text3dButtonProps) => {
  return (
    <button className='text-button' onClick={props.OnButtonClick}>
      <span className='title-tic1'>Tic</span>{' '}
      <span className='title-tic2'>Tic</span>{' '}
      <span className='title-tac'>Toe</span>
    </button>
  )
}

export default Text3dButton
