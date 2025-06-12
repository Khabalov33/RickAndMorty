import clsx from 'clsx'
import React from 'react'
import icon from '../../../assets/icon/search.svg'
import styles from './TextFilters.module.scss'

interface IFilterProps {
	placeholder: string
	value: string
	onChange: (value: string) => void
	className?: string
}

const Filter: React.FC<IFilterProps> = ({
	placeholder,
	value,
	onChange,
	className,
}) => {
	return (
		<div className={styles.filter}>
			<label htmlFor='filter_field' className={styles.filter__label}>
				<img src={icon} alt='иконка поиска' className={styles.filter__icon} />
			</label>
			<input
				type='text'
				className={clsx(styles.filter__field, className)}
				placeholder={placeholder}
				id='filter_field'
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	)
}

export default Filter
