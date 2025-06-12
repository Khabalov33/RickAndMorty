import logo from '../../../../assets/images/LocationPage-image.png'
import { Images } from '../../../shared/Images/Images'
import styles from './LocationHeader.module.scss'

const LocationHeader = () => {
	return (
		<div className={styles.wrapper}>
			<Images
				src={logo}
				alt='Главная картинка страницы с локацией'
				width={326}
				height={202}
				className={styles.wrapper__logo}
			/>
		</div>
	)
}

export default LocationHeader
