import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import parseISO from 'date-fns/parseISO'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import styled from 'styled-components'
import { api } from '../../service/api'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

const EpisodeStyled = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;
  margin: 0 auto;

  .thumbnailContainer {
    position: relative;

    img {
      border-radius: 1rem;
    }

    button {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      border: 0;
      position: absolute;
      z-index: 5;
      font-size: 0;

      transition: filter 0.2s;

      &:first-child {
        left: 0;
        top: 50%;
        background-color: var(--purple-500);
        transform: translate(-50%, -50%);
      }

      &:last-child {
        right: 0;
        top: 50%;
        background-color: var(--green-500);
        transform: translate(50%, -50%);
      }

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  header {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray-100);

    h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    span {
      display: inline-block;
      font-size: 0.875;

      & + span {
        margin-left: 1rem;
        padding-left: 1rem;
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

  .description {
    margin-top: 2rem;
    line-height: 1.675rem;
    color: var(--gray-800);

    p {
      margin: 1.5rem 0;
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
  description: string
}

type EpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
  // const router = useRouter()

  // if (router.isFallback) {
  //   return <p>Carregando...</p>
  // }

  return (
    <EpisodeStyled>
      <div className="thumbnailContainer">
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </EpisodeStyled>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const paths = data.map((episode) => {
    return {
      params: {
        slug: episode.id,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get(`/episodes/${ctx.params.slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}
