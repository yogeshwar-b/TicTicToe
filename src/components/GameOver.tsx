const GameOver = ({ winner }: { winner: string }) => {
  return (
    <div
      style={{
        position: 'absolute',
        minWidth: '50vw',
        maxWidth: '80vw',
        padding: '1rem',
        height: '50vh',
        background: 'linear-gradient(0deg, black, transparent)',
        zIndex: '10',
        display: 'grid',
        placeContent: 'center',
        fontSize: '2rem',
        opacity: '80%',
        color: 'white',
        transition: 'all 1s',
        textAlign: 'center',
        gap: '1rem',
        fontWeight: 'bolder',
        textShadow: '2px 2px 2px black'
      }}
    >
      <sub style={{ fontSize: '.6rem', marginTop: '30px' }}>
        Click on <u>Tic Tic Toe</u> to Restart the game.
      </sub>

      <span>Game Over. {winner} is winner</span>
    </div>
  )
}

export default GameOver
