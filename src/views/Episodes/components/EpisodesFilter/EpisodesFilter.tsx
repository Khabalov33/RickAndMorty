import type { EpisodesFilterParams } from '../../../../data/hooks/useEpisodes'
import TextFilters from '../../../shared/TextFilters/TextFilters'
import styles from './EpisodesFilter.module.scss'

export const EpisodesFilters = ({
	filters,
	setters,
}: {
	filters: EpisodesFilterParams
	setters: {
		setFilter: (v: string) => void
	}
}) => (
	<div className={styles.filter}>
		<TextFilters
			placeholder='Filter by name or episode (ex. S01 or S01E02)'
			value={filters.filter}
			onChange={setters.setFilter}
			className={styles.filter__field}
		/>
	</div>
)

export default EpisodesFilters
