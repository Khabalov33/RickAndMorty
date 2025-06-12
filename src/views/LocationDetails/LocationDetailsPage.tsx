import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocationDetails } from '../../data/hooks/useLocationDetails'
import { CharacterList } from '../Characters/components/CharacterList/CharacterList'
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage'
import GoBackButton from '../shared/GoBackButton/GoBackButton'
import LoadingIndicator from '../shared/LoadingIndicator/LoadingIndicator'
import styles from './LocationDetailsPage.module.scss'

const LocationDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { location, residents, loading, error } = useLocationDetails(Number(id))

	const handleGoBack = () => navigate(-1)

	if (loading) return <LoadingIndicator />
	if (error || !location)
		return <ErrorMessage message={error || 'Локация не найдена'} />

	return (
		<div className={styles.details}>
			<div className='container'>
				<div className={styles.details__wrapper}>
					<div className={styles.details__info}>
						<h2 className={styles.details__title}>{location.name}</h2>
						<ul className={styles.details__list}>
							<li className={styles.details__item}>
								<div className={styles.details__property}>
									<span className={styles.details__propertyName}>Type</span>
									<span className={styles.details__propertyValue}>
										{location.type}
									</span>
								</div>
							</li>
							<li className={styles.details__item}>
								<div className={styles.details__property}>
									<span className={styles.details__propertyName}>
										Dimension
									</span>
									<span className={styles.details__propertyValue}>
										{location.dimension}
									</span>
								</div>
							</li>
						</ul>
					</div>

					<div className={styles.details__residents}>
						<h3 className={styles.details__residentsTitle}>Residents</h3>

						{residents.length > 0 ? (
							<CharacterList
								characters={residents}
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

export default LocationDetailsPage
