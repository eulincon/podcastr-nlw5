import { useState } from 'react'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContext } from '../contexts/PlayerContext'
import '../styles/global.scss'

const AppWrapper = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
      }}
    >
      <AppWrapper>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </AppWrapper>
    </PlayerContext.Provider>
  )
}

export default MyApp
