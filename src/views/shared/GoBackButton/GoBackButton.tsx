import clsx from 'clsx'
import React from 'react'
import arrowIcon from '../../../assets/icon/arrow.png'
import { Images } from '../Images/Images'
import styles from './GoBackButton.module.scss'

interface GoBackButtonProps {
	onClick: () => void
	className: string
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick, className }) => {
	return (
		<button className={clsx(styles.goBackButton, className)} onClick={onClick}>
			<Images
				className={styles.goBackButton__icon}
				src={arrowIcon}
				alt='иконка для кнопки назад'
				width={24}
				height={24}
			/>
			<span className={styles.goBackButton__text}>go back</span>
		</button>
	)
}

export default GoBackButton
