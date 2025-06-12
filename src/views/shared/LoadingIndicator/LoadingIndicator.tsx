import icon from '../../../assets/icon/loading.svg'
import styles from './LoadingIndicator.module.scss'

const LoadingIndicator = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.loading__portal}>
				<img
					className={styles.loading__image}
					src={icon}
					alt='Портал загрузки в другую вселенную'
					width={200}
					height={200}
				/>
				<div className={styles.loading__particles} />
			</div>
		</div>
	)
}

export default LoadingIndicator
