import React from 'react'
import { Link } from 'react-router-dom'
import type { IEpisodes } from '../../../../data/models/episode'
import styles from './EpisodeCard.module.scss'

interface IEpisodesCardProps {
	episodes: IEpisodes
}

const EpisodesCard: React.FC<IEpisodesCardProps> = ({ episodes }) => {
	return (
		<Link
			to={`/episodes/${episodes.id}`}
			aria-label={`Подробнее о ${episodes.name}`}
		>
			<div className={styles.episodesCard}>
				<h2 className={styles.episodesCard__name} title={episodes.name}>
					{episodes.name}
				</h2>
				<span className={styles.episodesCard__date}>{episodes.air_date}</span>
				<span className={styles.episodesCard__episodes}>
					{episodes.episode}
				</span>
			</div>
		</Link>
	)
}

export default EpisodesCard
