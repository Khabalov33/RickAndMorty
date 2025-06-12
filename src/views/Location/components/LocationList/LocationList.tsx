import type { ILocation } from '../../../../data/models/location'
import LocationCard from '../../../shared/Card/LocationCard/LocationCard'
import LoadMoreCharacters from '../../../shared/LoadMoreCard/LoadMoreCard'
import styles from './LoctionList.module.scss'

export const LocationList = ({
	locations,
	isLoading,
	hasMore,
	onLoadMore,
}: {
	locations: ILocation[]
	isLoading: boolean
	hasMore: boolean
	onLoadMore: () => void
}) => (
	<>
		<ul className={styles.list}>
			{locations.map(location => (
				<li key={location.id} className={styles.list__item}>
					<LocationCard location={location} />
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
