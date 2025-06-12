import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCharacterDetails } from '../../data/hooks/useCharacterDetails'
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage'
import GoBackButton from '../shared/GoBackButton/GoBackButton'
import LoadingIndicator from '../shared/LoadingIndicator/LoadingIndicator'
import styles from './CharacterDetailsPage.module.scss'
import CharacterDetailsEpisodesList from './components/CharacterDetailsEpisodes/CharacterDetailsEpisodes'
import CharacterDetailsInfo from './components/CharacterDetailsInfo/CharacterDetailsInfo'
import CharacterDetailsProfile from './components/CharacterDetailsProfile/CharacterDetailsProfile'

const CharacterDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { character, episodes, loading, error } = useCharacterDetails(
		Number(id)
	)

	const handleGoBack = () => navigate(-1)

	if (loading) return <LoadingIndicator />
	if (error || !character)
		return <ErrorMessage message={error || `Нет информации`} />

	return (
		<div className={styles.details}>
			<div className='container'>
				<div className={styles.details__wrapper}>
					<CharacterDetailsProfile
						src={character.image}
						alt={`Портрет ${character.name}`}
						width={300}
						height={300}
						characterName={character.name}
					/>

					<div className={styles.details__content}>
						<CharacterDetailsInfo character={character} />
						<CharacterDetailsEpisodesList episodes={episodes} />
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

export default CharacterDetailsPage
