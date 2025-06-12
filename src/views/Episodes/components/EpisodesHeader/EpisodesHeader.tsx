import logo from '../../../../assets/images/episodesPage-image.png'
import { Images } from '../../../shared/Images/Images'
import styles from './EpisodesHeader.module.scss'

const EpisodesHeader = () => {
	return (
		<div className={styles.wrapper}>
			<Images
				className={styles.wrapper__images}
				src={logo}
				alt='Картинка с Риком и Морти для страницы с эпизодами'
				width={269}
				height={210}
			/>
		</div>
	)
}

export default EpisodesHeader
