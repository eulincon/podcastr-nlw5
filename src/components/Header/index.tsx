import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import styled from 'styled-components'

const HeaderStyled = styled.header`
	background: var(--white);
	height: 6.5rem; //104px

	display: flex;
	align-items: center;

	padding: 2rem 4rem;

	border-bottom: 1px solid var(--gray-100);

	p {
		margin-left: 2rem;
		padding: 0.25rem 0 0.25rem 2rem;
		border-left: 1px solid var(--grey-100);
	}

	span {
		margin-left: auto;
		text-transform: capitalize;
	}
`
export function Header() {
	const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
		locale: ptBR,
	})
	return (
		<HeaderStyled>
			<img src='/logo.svg' alt='Podcastr' />
			<p>O melhor para você ouvir, sempre</p>
			<span>{currentDate}</span>
		</HeaderStyled>
	)
}
