import type { ILocation } from '../models/location'
import apiClient from './apiClient'

const getLocations = async (
	page: number,
	name?: string,
	type?: string | null,
	dimension?: string | null
) => {
	try {
		const response = await apiClient.get('/location', {
			params: {
				page,
				name: name || undefined,
				type: type || undefined,
				dimension: dimension || undefined,
			},
		})
		return response.data
	} catch (err) {
		console.error('Ошибка при загрузке локаций:', err)
		throw err
	}
}

export const getLocationById = async (id: number): Promise<ILocation> => {
	try {
		const response = await apiClient.get(`/location/${id}`)
		return response.data
	} catch (err) {
		console.error(`Ошибка при загрузке локации: ${err}`)
		throw err
	}
}

export default getLocations
