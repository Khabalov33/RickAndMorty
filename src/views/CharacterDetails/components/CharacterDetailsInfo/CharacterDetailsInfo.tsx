import React from 'react'
import type { ICharacter } from '../../../../data/models/character'
import styles from './CharacterDetailsInfo.module.scss'

interface InfoItem {
	label: string
	value: string | number
}

interface CharacterDetailsInfoProps {
	character: ICharacter
}

const CharacterDetailsInfo: React.FC<CharacterDetailsInfoProps> = ({
	character,
}) => {
	const infoItems: InfoItem[] = [
		{ label: 'Gender', value: character.gender },
		{ label: 'Status', value: character.status },
		{ label: 'Species', value: character.species },
		{ label: 'Origin', value: character.origin.name },
		{ label: 'Type', value: character.type },
		{ label: 'Location', value: character.type },
	]

	return (
		<div className={styles.info}>
			<h3 className={styles.info__subtitle}>Information</h3>
			<ul className={styles.info__list}>
				{infoItems.map((item, index) => (
					<li key={index} className={styles.info__item}>
						<span className={styles.info__label}>{item.label}</span>
						<span className={styles.info__value}>{item.value}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CharacterDetailsInfo
