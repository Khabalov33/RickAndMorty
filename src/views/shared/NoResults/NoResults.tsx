import clsx from 'clsx'
import styles from './NoResults.module.scss'

interface INoResultsProps {
	filterValue: string
	className?: string
}

const NoResults: React.FC<INoResultsProps> = ({ filterValue, className }) => (
	<div className={clsx(styles.noResults, className)}>
		<span className={styles.noResults__text}>
			Персонажей с именем "{filterValue}" не найдено
		</span>
	</div>
)

export default NoResults
