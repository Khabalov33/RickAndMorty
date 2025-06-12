import type { CharacterParams } from '../../../../data/hooks/useCharacter'
import DropDownFilter from '../../../shared/DropDownFilter/DropDownFilter'
import TextFilters from '../../../shared/TextFilters/TextFilters'
import styles from './CharacterFilters.module.scss'
import { genderOptions, speciesOptions, statusOptions } from './filterOptions'

export const CharacterFilters = ({
	filters,
	setters,
}: {
	filters: CharacterParams
	setters: {
		setName: (v: string) => void
		setSpecies: (v: string | null) => void
		setGender: (v: string | null) => void
		setStatus: (v: string | null) => void
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
			options={speciesOptions}
			selectedValue={filters.species}
			onSelect={setters.setSpecies}
			placeholder='Species'
		/>

		<DropDownFilter
			options={genderOptions}
			selectedValue={filters.gender}
			onSelect={setters.setGender}
			placeholder='Gender'
		/>

		<DropDownFilter
			options={statusOptions}
			selectedValue={filters.status}
			onSelect={setters.setStatus}
			placeholder='Status'
		/>
	</div>
)
