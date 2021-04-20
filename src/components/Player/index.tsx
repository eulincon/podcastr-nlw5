import styled from 'styled-components'

const PlayerContainer = styled.div`
  padding: 3rem 4rem;
  width: 26.5rem;
  height: 100vh;

  background: var(--purple-500);
  color: var(--white);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

  footer {
    align-self: stretch;
    &.empty {
      opacity: 0.5;
    }
  }

  .emptyPlayer {
    width: 100%;
    height: 20rem;
    border: 1.5px dashed var(--purple-300);
    border-radius: 1.5rem;
    background: linear-gradient(
      143.8deg,
      rgba(145, 100, 250, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    );

    padding: 4rem;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    font-size: 0.875rem;

    span {
      display: inline-block;
      width: 4rem;
      text-align: center;
    }

    .slider {
      flex: 1;
      .emptySlider {
        width: 100%;
        height: 4px;
        background: var(--purple-300);
        border-radius: 2px;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2.5rem;
    gap: 1.4rem;

    button {
      background: transparent;
      border: 0;
      font-size: 0;

      &.playButton {
        width: 4rem;
        height: 4rem;
        border-radius: 1rem;
        background: var(--purple-400);
      }
    }
  }
`
export function Player() {
  return (
    <PlayerContainer>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className="emptyPlayer">
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className="empty">
        <div className="progress">
          <span>00:00</span>
          <div className="slider">
            <div className="emptySlider" />
          </div>
          <span>00:00</span>
        </div>

        <div className="buttons">
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className="playButton">
            <img src="/play.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </PlayerContainer>
  )
}
