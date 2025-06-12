import type { IEpisodes } from '../../../../data/models/episode'
import EpisodesCard from '../../../shared/Card/EpisodeCard/EpisodeCard'
import LoadMoreCharacters from '../../../shared/LoadMoreCard/LoadMoreCard'
import styles from './EpisodesList.module.scss'

export const EpisodesList = ({
	episodes,
	isLoading,
	hasMore,
	onLoadMore,
}: {
	episodes: IEpisodes[]
	isLoading: boolean
	hasMore: boolean
	onLoadMore: () => void
}) => (
	<>
		<ul className={styles.list}>
			{episodes.map(episodes => (
				<li key={episodes.id} className={styles.list__item}>
					<EpisodesCard episodes={episodes} />
				</li>
			))}
		</ul>

		{hasMore && (
			<LoadMoreCharacters
				isLoading={isLoading}
				hasMore={hasMore}
				onClick={onLoadMore}
			/>
		)}
	</>
)
