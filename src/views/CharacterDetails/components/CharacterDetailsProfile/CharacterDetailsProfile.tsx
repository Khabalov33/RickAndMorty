import React from 'react'
import { Images } from '../../../shared/Images/Images'
import styles from './CharacterDetailsProfile.module.scss'

interface ICharacterDetailsProfileProps {
	src: string
	alt: string
	width: number
	height: number
	characterName: string
}

const CharacterDetailsProfile: React.FC<ICharacterDetailsProfileProps> = ({
	src,
	alt,
	width,
	height,
	characterName,
}) => {
	return (
		<div className={styles.profile}>
			<Images
				className={styles.profile__image}
				src={src}
				alt={alt}
				width={width}
				height={height}
			/>
			<h2 className={styles.profile__name}>{characterName}</h2>
		</div>
	)
}

export default CharacterDetailsProfile
