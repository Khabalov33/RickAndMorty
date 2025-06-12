import { useEffect, useState } from 'react'
import { extractCharacterIds, getCharactersByIds } from '../api/characters'
import { getEpisodesById } from '../api/episodes'
import type { ICharacter } from '../models/character'
import type { IEpisodes } from '../models/episode'

export const useEpisodesDetails = (id: number) => {
	const [episodes, setEpisodes] = useState<IEpisodes | null>(null)
	const [characters, setCharacters] = useState<ICharacter[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)

				const episodesData = await getEpisodesById(id)
				setEpisodes(episodesData)

				const residentIds = extractCharacterIds(episodesData.characters)

				if (residentIds.length > 0) {
					const charactersData = await getCharactersByIds(residentIds)
					setCharacters(
						Array.isArray(charactersData) ? charactersData : [charactersData]
					)
				}
			} catch (err) {
				setError(`Ошибка при загрузке данных эпизодов: ${err}`)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [id])

	return { episodes, characters, loading, error }
}
