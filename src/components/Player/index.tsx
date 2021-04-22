import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { PlayerContext } from '../../contexts/PlayerContext'

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

  .currentEpisode {
    text-align: center;

    img {
      border-radius: 1.5rem;
    }

    strong {
      display: block;
      margin-top: 2rem;
      font: 600 1.25rem Lexend, sans-serif;
      line-height: 1.75rem;
    }

    span {
      display: block;
      margin-top: 1rem;
      opacity: 0.6;
      line-height: 1.5rem;
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

      transition: filter 0.2s;

      &:disabled {
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        filter: brightness(0.7);
      }

      &.playButton {
        width: 4rem;
        height: 4rem;
        border-radius: 1rem;
        background: var(--purple-400);

        &:hover:not(:disabled) {
          filter: brightness(0.95);
        }
      }
    }
  }
`
export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
  } = useContext(PlayerContext)
  useEffect(() => {
    if (!audioRef.current) {
      return
    }
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])
  const episode = episodeList[currentEpisodeIndex]
  return (
    <PlayerContainer>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className="currentEpisode">
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className="emptyPlayer">
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? 'empty' : ''}>
        <div className="progress">
          <span>00:00</span>
          <div className="slider">
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className="emptySlider" />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.url}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className="buttons">
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className="playButton"
            disabled={!episode}
            onClick={() => togglePlay()}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </PlayerContainer>
  )
}
