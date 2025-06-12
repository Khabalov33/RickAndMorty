import type { AxiosError } from 'axios'
import type { ICharacter, IEpisodeDetails } from '../models/character'
import apiClient from './apiClient'

const getCharacters = async (
	page: number,
	name?: string,
	species?: string | null,
	gender?: string | null,
	status?: string | null
) => {
	try {
		const response = await apiClient.get('/character', {
			params: {
				page,
				name: name || undefined,
				species: species || undefined,
				gender: gender || undefined,
				status: status || undefined,
			},
		})
		return response.data
	} catch (err) {
		console.error('Ошибка при загрузке персонажей:', err)
		throw err
	}
}

export const getCharacterById = async (id: number): Promise<ICharacter> => {
	try {
		const response = await apiClient.get(`/character/${id}`)
		return response.data
	} catch (err) {
		const axiosError = err as AxiosError
		console.error('Ошибка при загрузке персонажа:', axiosError.message)
		throw axiosError
	}
}

export const getCharactersByIds = async (
	ids: number[]
): Promise<ICharacter | ICharacter[]> => {
	try {
		const response = await apiClient.get(`/character/${ids.join(',')}`)
		return response.data
	} catch (err) {
		console.error('Ошибка при загрузке персонажей:', err)
		throw err
	}
}

export const extractCharacterIds = (characterUrls: string[]): number[] => {
	return characterUrls
		.map(url => url.split('/').pop())
		.filter(Boolean)
		.map(Number)
}

export const getEpisodesByIds = async (
	ids: number[]
): Promise<IEpisodeDetails | IEpisodeDetails[]> => {
	try {
		const response = await apiClient.get(`/episode/${ids.join(',')}`)
		return response.data
	} catch (err) {
		console.error('Ошибка при загрузке эпизодов:', err)
		throw err
	}
}

export const extractEpisodeIds = (episodeUrls: string[]): number[] => {
	return episodeUrls
		.map(url => url.split('/').pop())
		.filter(Boolean)
		.map(Number)
}

export default getCharacters
