import React from 'react'
import type { IEpisodeDetails } from '../../../../data/models/character'
import styles from './CharacterDetailsEpisodes.module.scss'

interface CharacterDetailsEpisodesListProps {
	episodes: IEpisodeDetails[]
}

const CharacterDetailsEpisodesList: React.FC<
	CharacterDetailsEpisodesListProps
> = ({ episodes }) => {
	return (
		<div className={styles.episodes}>
			<h3 className={styles.episodes__subtitle}>Episodes</h3>
			<ul className={styles.episodes__list}>
				{episodes.map(episode => (
					<li key={episode.id} className={styles.episodes__item}>
						<span className={styles.episodes__code}>{episode.episode}</span>
						<span className={styles.episodes__title}>{episode.name}</span>
						<span className={styles.episodes__date}>{episode.air_date}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CharacterDetailsEpisodesList
