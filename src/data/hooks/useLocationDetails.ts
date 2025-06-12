import { useEffect, useState } from 'react'
import { extractCharacterIds, getCharactersByIds } from '../api/characters'
import { getLocationById } from '../api/locations'
import type { ICharacter } from '../models/character'
import type { ILocation } from '../models/location'

export const useLocationDetails = (id: number) => {
	const [location, setLocation] = useState<ILocation | null>(null)
	const [residents, setResidents] = useState<ICharacter[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)

				const locationData = await getLocationById(id)
				setLocation(locationData)

				const residentIds = extractCharacterIds(locationData.residents)

				if (residentIds.length > 0) {
					const residentsData = await getCharactersByIds(residentIds)
					setResidents(
						Array.isArray(residentsData) ? residentsData : [residentsData]
					)
				}
			} catch (err) {
				setError(`Ошибка при загрузке данных локации: ${err}`)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [id])

	return { location, residents, loading, error }
}
