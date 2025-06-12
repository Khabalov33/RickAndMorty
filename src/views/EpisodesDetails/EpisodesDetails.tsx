import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEpisodesDetails } from '../../data/hooks/useEpisodesDetails'
import { CharacterList } from '../Characters/components/CharacterList/CharacterList'
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage'
import GoBackButton from '../shared/GoBackButton/GoBackButton'
import LoadingIndicator from '../shared/LoadingIndicator/LoadingIndicator'
import styles from './EpisodesDetails.module.scss'

const EpisodesDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { episodes, characters, loading, error } = useEpisodesDetails(
		Number(id)
	)

	const handleGoBack = () => navigate(-1)

	if (loading) return <LoadingIndicator />
	if (error || !episodes)
		return <ErrorMessage message={error || 'Локация не найдена'} />

	return (
		<div className={styles.details}>
			<div className='container'>
				<div className={styles.details__wrapper}>
					<div className={styles.details__info}>
						<h2 className={styles.details__title}>{episodes.name}</h2>
						<ul className={styles.details__list}>
							<li className={styles.details__item}>
								<div className={styles.details__property}>
									<span className={styles.details__propertyName}>Type</span>
									<span className={styles.details__propertyValue}>
										{episodes.episode}
									</span>
								</div>
							</li>
							<li className={styles.details__item}>
								<div className={styles.details__property}>
									<span className={styles.details__propertyName}>
										Dimension
									</span>
									<span className={styles.details__propertyValue}>
										{episodes.air_date}
									</span>
								</div>
							</li>
						</ul>
					</div>

					<div className={styles.details__residents}>
						<h3 className={styles.details__residentsTitle}>Residents</h3>

						{characters.length > 0 ? (
							<CharacterList
								characters={characters}
								isLoading={false}
								hasMore={false}
								onLoadMore={() => {}}
							/>
						) : (
							<p className={styles.details__empty}>Персонажи не найдены</p>
						)}
					</div>
					<GoBackButton
						onClick={handleGoBack}
						className={styles.details__button}
					/>
				</div>
			</div>
		</div>
	)
}

export default EpisodesDetailsPage
