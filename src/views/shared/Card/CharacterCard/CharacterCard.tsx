import React from 'react'
import { Link } from 'react-router-dom'
import type { ICharacter } from '../../../../data/models/character'
import { Images } from '../../Images/Images'
import styles from './CharacterCard.module.scss'

interface ICharacterCardProps {
	character: ICharacter
	to: string
}

const CharacterCard: React.FC<ICharacterCardProps> = ({ character, to }) => {
	return (
		<Link to={to} aria-label={`Подробнее о ${character.name}`}>
			<div className={styles.characterCard}>
				<Images
					className={styles.characterCard__image}
					src={character.image}
					alt={`фотография ${character.name}`}
					width={240}
					height={168}
				/>
				<div className={styles.characterCard__info}>
					<h2 className={styles.characterCard__name} title={character.name}>
						{character.name}
					</h2>
					<span className={styles.characterCard__species}>
						{character.species}
					</span>
				</div>
			</div>
		</Link>
	)
}

export default CharacterCard
