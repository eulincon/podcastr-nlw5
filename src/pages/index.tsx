import { GetStaticProps } from 'next'
import Image from 'next/image'
import { api } from '../service/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import styled from 'styled-components'
import Link from 'next/link'

const HomePageStyled = styled.div`
  padding: 0 4rem;
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;

  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  .all-episodes {
    padding-bottom: 2rem;

    table {
      width: 100%;

      th,
      td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--gray-100);
      }

      th {
        color: var(--gray-200);
        text-transform: uppercase;
        font: 500 0.75rem Lexend, sans-serif;
        text-align: left;
      }

      td {
        font-size: 0.875rem;

        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
        }

        a {
          color: var(--gray-800);
          font-family: Lexend, sans-serif;
          font-weight: 600;
          text-decoration: none;
          line-height: 1.4rem;
          font-size: 1rem;

          &:hover {
            text-decoration: underline;
          }
        }

        button {
          width: 2.5rem;
          height: 2rem;
          background-color: var(--white);
          border: 1px solid var(--gray-100);
          border-radius: 0.5rem;
          font-size: 0;

          transition: filter 0.2s;

          img {
            width: 1.25rem;
            height: 1.5rem;
          }

          &:hover {
            filter: brightness(0.95);
          }
        }
      }
    }
  }

  .latest-episodes {
    ul {
      list-style: nome;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;

      li {
        background: var(--white);
        border: 1px solid var(--gray-100);
        padding: 1.25rem;
        border-radius: 1.5rem;
        position: relative;

        display: flex;
        align-items: center;

        img {
          width: 6rem;
          height: 6rem;
          border-radius: 1rem;
        }

        .episode-details {
          flex: 1;
          margin-left: 1rem;

          a {
            display: block;
            color: var(--gray-800);
            font-family: Lexend, sans-serif;
            font-weight: 600;
            text-decoration: none;
            line-height: 1.4rem;

            &.hover {
              text-decoration: underline;
            }
          }

          p {
            font-size: 0.875rem;
            margin-top: 0.5rem;
            max-width: 70%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          span {
            display: inline-block;
            margin-top: 0.5rem;
            font-size: 0.875rem;

            &:last-child {
              margin-left: 0.5rem;
              padding-left: 0.5rem;
              position: relative;

              &::before {
                content: '';
                width: 4px;
                height: 4px;
                border-radius: 2px;
                background-color: #ddd;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
        button {
          position: absolute;
          right: 2rem;
          bottom: 2rem;
          width: 2.5rem;
          height: 2.5rem;
          background-color: var(--white);
          border: 1px solid var(--gray-100);
          border-radius: 0.675rem;
          font-size: 0;

          transition: filter 0.2s;

          img {
            width: 1.5rem;
            height: 1.5rem;
          }

          &:hover {
            filter: brightness(0.95);
          }
        }
      }
    }
  }
`

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  publishedAt: string
}

type HomeProps = {
  latestEpisodes: Array<Episode>
  allEpisodes: Array<Episode>
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <HomePageStyled>
      <section className="latest-episodes">
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                <div className="episode-details">
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>
      <section className="all-episodes">
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </HomePageStyled>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
