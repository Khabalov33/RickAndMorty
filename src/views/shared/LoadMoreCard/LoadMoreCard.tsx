import React, { useState } from 'react'
import styles from './LoadMoreCard.module.scss'

interface ILoadMoreCardProps {
	hasMore: boolean | string
	isLoading: boolean
	onClick: () => void
}

const LoadMoreCard: React.FC<ILoadMoreCardProps> = ({
	isLoading,
	hasMore,
	onClick,
}) => {
	const [isClicked, setIsClicked] = useState(false)

	if (!hasMore) return null

	const handleClick = () => {
		if (!isLoading && !isClicked) {
			setIsClicked(true)
			onClick()

			setTimeout(() => setIsClicked(false), 500)
		}
	}

	return (
		<div className={styles.loadMoreCharacters}>
			<button
				className={styles.loadMoreCharacters__button}
				onClick={handleClick}
				disabled={isLoading || isClicked}
			>
				{isLoading || isClicked ? 'Loading...' : 'Load More'}
			</button>
		</div>
	)
}

export default LoadMoreCard
