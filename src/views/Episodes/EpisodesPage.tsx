import { useSelector } from 'react-redux'
import { useEpisodesFilters } from '../../data/hooks/useEpisodes'
import type { RootState } from '../../data/store/store'
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage'
import LoadingIndicator from '../shared/LoadingIndicator/LoadingIndicator'
import NoResults from '../shared/NoResults/NoResults'
import EpisodesFilter from './components/EpisodesFilter/EpisodesFilter'
import EpisodesHeader from './components/EpisodesHeader/EpisodesHeader'
import { EpisodesList } from './components/EpisodesList/EpisodesList'
import styles from './EpisodesPage.module.scss'

const EpisodesPage = () => {
	const { uiFilters, visibleCount, setters, handleLoadMore } =
		useEpisodesFilters()

	const { data, loading, error } = useSelector(
		(state: RootState) => state.episodes
	)

	const visibleEpisodes = data?.results.slice(0, visibleCount) || []

	const hasMoreEpisodes =
		Boolean(data?.info.next) || (!!data && visibleCount < data.results.length)

	if (loading && !data) return <LoadingIndicator />

	if (error) return <ErrorMessage message={error} />

	return (
		<div className={styles.episodesPage}>
			<div className='container'>
				<div className={styles.episodesPage__wrapper}>
					<EpisodesHeader />
					<EpisodesFilter filters={uiFilters} setters={setters} />
					{!loading && data?.results.length === 0 ? (
						<NoResults
							filterValue={uiFilters.filter} 
							className={styles.episodesPage__noResults}
						/>
					) : (
						<EpisodesList
							episodes={visibleEpisodes}
							isLoading={loading}
							hasMore={hasMoreEpisodes}
							onLoadMore={handleLoadMore}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default EpisodesPage
