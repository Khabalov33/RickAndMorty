import { useSelector } from 'react-redux'
import { useLocation } from '../../data/hooks/useLocation'
import type { RootState } from '../../data/store/store'
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage'
import LoadingIndicator from '../shared/LoadingIndicator/LoadingIndicator'
import NoResults from '../shared/NoResults/NoResults'
import { LocationFilters } from './components/LocationFilter/LocationFilter'
import LocationHeader from './components/LocationHeader/LocationHeader'
import { LocationList } from './components/LocationList/LocationList'
import styles from './LocationPage.module.scss'

const LocationPage = () => {
	const { uiFilters, visibleCount, handleLoadMore, setters } = useLocation()

	const { data, loading, error } = useSelector(
		(state: RootState) => state.locations
	)

	const visibleLocation = data?.results.slice(0, visibleCount) || []

	const hasMoreLocation =
		Boolean(data?.info.next) || (!!data && visibleCount < data.results.length)

	if (loading && !data) return <LoadingIndicator />

	if (error) return <ErrorMessage message={error} />

	console.log(data)

	return (
		<div className={styles.locationPage}>
			<div className='container'>
				<div className={styles.locationPage__wrapper}>
					<LocationHeader />

					<LocationFilters filters={uiFilters} setters={setters} />

					{!loading && data?.results.length === 0 ? (
						<NoResults
							filterValue={uiFilters.name}
							className={styles.locationPage__noResults}
						/>
					) : (
						<LocationList
							locations={visibleLocation}
							isLoading={loading}
							hasMore={hasMoreLocation}
							onLoadMore={handleLoadMore}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default LocationPage
