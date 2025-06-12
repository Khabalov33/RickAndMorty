import { useSelector } from 'react-redux'
import { useCharacter } from '../../data/hooks/useCharacter'
import type { RootState } from '../../data/store/store'
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage'
import LoadingIndicator from '../shared/LoadingIndicator/LoadingIndicator'
import NoResults from '../shared/NoResults/NoResults'
import styles from './CharactersPage.module.scss'
import { CharacterFilters } from './components/CharacterFilters/CharacterFilters'
import { CharacterHeader } from './components/CharacterHeader/CharacterHeader'
import { CharacterList } from './components/CharacterList/CharacterList'

const CharactersPage = () => {
	const { uiFilters, visibleCount, setters, handleLoadMore } = useCharacter()

	const { data, loading, error } = useSelector(
		(state: RootState) => state.characters
	)

	const visibleCharacters = data?.results.slice(0, visibleCount) || []

	const hasMoreCharacters =
		Boolean(data?.info.next) || (!!data && visibleCount < data.results.length)

	if (loading && !data) return <LoadingIndicator />

	if (error) return <ErrorMessage message={error} />

	return (
		<div className={styles.characterPage}>
			<div className='container'>
				<div className={styles.characterPage__wrapper}>
					<CharacterHeader />

					<CharacterFilters filters={uiFilters} setters={setters} />

					{!loading && data?.results.length === 0 ? (
						<NoResults
							filterValue={uiFilters.name}
							className={styles.characterPage__noResults}
						/>
					) : (
						<CharacterList
							characters={visibleCharacters}
							isLoading={loading}
							hasMore={hasMoreCharacters}
							onLoadMore={handleLoadMore}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default CharactersPage
