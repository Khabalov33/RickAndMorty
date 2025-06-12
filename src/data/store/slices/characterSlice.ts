import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import getCharacters from '../../api/characters'
import type { ICharactersResponse } from '../../models/character'

interface CharactersState {
	data: ICharactersResponse | null
	loading: boolean
	error: string | null
	currentName: string
	currentSpecies: string | null
	currentGender: string | null
	currentStatus: string | null
}

const initialState: CharactersState = {
	data: null,
	loading: false,
	error: null,
	currentName: '',
	currentSpecies: null,
	currentGender: null,
	currentStatus: null,
}

export const fetchCharacters = createAsyncThunk(
	'characters/fetchAll',
	async (
		{
			page,
			name,
			species,
			gender,
			status,
		}: {
			page: number
			name?: string
			species?: string | null
			gender?: string | null
			status?: string | null
		},
		{ rejectWithValue }
	) => {
		try {
			const data = await getCharacters(page, name, species, gender, status)
			return {
				data,
				name: name || '',
				species: species || null,
				gender: gender || null,
				status: status || null,
			}
		} catch (err) {
			const axiosError = err as AxiosError

			if (axiosError.response?.status === 404) {
				return {
					data: {
						info: { count: 0, pages: 0, next: null, prev: null },
						results: [],
					},
					name: name || '',
					species: species || null,
					gender: gender || null,
					status: status || null,
				}
			}

			const errorMessage = axiosError.message || 'Unknown error'
			return rejectWithValue(`Ошибка загрузки, ${errorMessage}`)
		}
	}
)

const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		resetFilter: state => {
			state.currentName = ''
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCharacters.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCharacters.fulfilled, (state, action) => {
				state.loading = false
				const { data, name, species, gender, status } = action.payload

				const filtersChanged =
					name !== state.currentName ||
					species !== state.currentSpecies ||
					gender !== state.currentGender ||
					status !== state.currentStatus

				if (filtersChanged || action.meta.arg.page === 1) {
					state.data = data
					state.currentName = name
					state.currentSpecies = species
					state.currentGender = gender
					state.currentStatus = status
				} else {
					if (state.data && data) {
						state.data = {
							...data,
							results: [...state.data.results, ...data.results],
						}
					} else {
						state.data = data
					}
				}
			})
			.addCase(fetchCharacters.rejected, (state, action) => {
				state.loading = false
				state.error =
					typeof action.payload === 'string'
						? action.payload
						: 'Ошибка загрузки персонажей'
				state.data = null
				state.currentName = ''
				state.currentSpecies = null
				state.currentGender = null
				state.currentStatus = null
			})
	},
})

export const { resetFilter } = charactersSlice.actions
export default charactersSlice.reducer
