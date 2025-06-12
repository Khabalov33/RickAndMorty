import { useEffect, useState } from 'react'
import {
	extractEpisodeIds,
	getCharacterById,
	getEpisodesByIds,
} from '../api/characters'
import type { ICharacter, IEpisodeDetails } from '../models/character'

export const useCharacterDetails = (id: number) => {
	const [character, setCharacter] = useState<ICharacter | null>(null)
	const [episodes, setEpisodes] = useState<IEpisodeDetails[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const characterData = await getCharacterById(id)
				setCharacter(characterData)

				const episodeIds = extractEpisodeIds(characterData.episode)
				if (episodeIds.length > 0) {
					const episodesData = await getEpisodesByIds(episodeIds)
					setEpisodes(
						Array.isArray(episodesData) ? episodesData : [episodesData]
					)
				}
			} catch (err) {
				setError(`Ошибка при загрузке данных персонажа: ${err}`)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [id])

	return { character, episodes, loading, error }
}
