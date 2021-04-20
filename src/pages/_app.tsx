import styled from 'styled-components'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import '../styles/global.scss'

const AppWrapper = styled.div`
	display: flex;

	main {
		flex: 1;
	}
`

function MyApp({ Component, pageProps }) {
	return (
		<AppWrapper>
			<main>
				<Header />
				<Component {...pageProps} />
			</main>
			<Player />
		</AppWrapper>
	)
}

export default MyApp
