import styled from 'styled-components'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import '../styles/global.scss'

const AppWrapper = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <AppWrapper>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </AppWrapper>
    </PlayerContextProvider>
  )
}

export default MyApp
