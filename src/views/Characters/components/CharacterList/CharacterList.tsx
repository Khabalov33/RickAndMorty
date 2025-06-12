import type { ICharacter } from '../../../../data/models/character'
import CharacterCard from '../../../shared/Card/CharacterCard/CharacterCard'
import LoadMoreCard from '../../../shared/LoadMoreCard/LoadMoreCard'
import styles from './CharacterList.module.scss'

export const CharacterList = ({
	characters,
	isLoading,
	hasMore,
	onLoadMore,
}: {
	characters: ICharacter[]
	isLoading: boolean
	hasMore: boolean
	onLoadMore: () => void
}) => (
	<>
		<ul className={styles.list}>
			{characters.map(character => (
				<li key={character.id} className={styles.list__item}>
					<CharacterCard
						character={character}
						to={`/characters/${character.id}`}
					/>
				</li>
			))}
		</ul>

		{hasMore && (
			<LoadMoreCard
				isLoading={isLoading}
				hasMore={hasMore}
				onClick={onLoadMore}
			/>
		)}
	</>
)
