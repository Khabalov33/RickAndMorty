import logo from '../../../../assets/images/CharacterPage-image.png'
import { Images } from '../../../shared/Images/Images'
import styles from './CharacterHeader.module.scss'

export const CharacterHeader = () => {
	return (
		<div className={styles.wrapper}>
			<Images
				className={styles.wrapper__image}
				src={logo}
				alt='Логотип Rick And Morty'
				width={600}
				height={200}
			/>
		</div>
	)
}
