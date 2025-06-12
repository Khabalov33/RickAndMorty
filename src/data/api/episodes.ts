import type { IEpisodes } from '../models/episode'
import apiClient from './apiClient'

const getEpisodes = async (page: number, name?: string, episode?: string) => {
	try {
		const response = await apiClient.get('/episode', {
			params: {
				page,
				...(name && { name }),
				...(episode && { episode }),
			},
		})
		return response.data
	} catch (err) {
		console.error('Ошибка при загрузке эпизодов:', err)
		throw err
	}
}

export const getEpisodesById = async (id: number): Promise<IEpisodes> => {
	try {
		const response = await apiClient.get(`/episode/${id}`)
		return response.data
	} catch (err) {
		console.error(`Ошибка при загрузке локации: ${err}`)
		throw err
	}
}

export default getEpisodes
