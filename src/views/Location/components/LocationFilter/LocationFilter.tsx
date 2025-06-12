import type { LocationFilterParams } from '../../../../data/hooks/useLocation'
import DropDownFilter from '../../../shared/DropDownFilter/DropDownFilter'
import TextFilters from '../../../shared/TextFilters/TextFilters'
import styles from './LocationFilters.module.scss'
import { dimensionOptions, typeOptions } from './filterOptions'

export const LocationFilters = ({
	filters,
	setters,
}: {
	filters: LocationFilterParams
	setters: {
		setName: (v: string) => void
		setType: (v: string | null) => void
		setDimension: (v: string | null) => void
	}
}) => (
	<div className={styles.filter}>
		<TextFilters
			placeholder='Filter by name...'
			value={filters.name}
			onChange={setters.setName}
			className={styles.filter__field}
		/>

		<DropDownFilter
			options={typeOptions}
			selectedValue={filters.type}
			onSelect={setters.setType}
			placeholder='Type'
		/>

		<DropDownFilter
			options={dimensionOptions}
			selectedValue={filters.dimension}
			onSelect={setters.setDimension}
			placeholder='Dimension'
		/>
	</div>
)
