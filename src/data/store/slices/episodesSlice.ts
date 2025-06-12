import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import getEpisodes from '../../api/episodes'
import type { IEpisodesResponse } from '../../models/episode'

interface IEpisodesState {
	data: IEpisodesResponse | null
	error: string | null
	loading: boolean
	currentFilter: string
}

const initialState: IEpisodesState = {
	data: null,
	error: null,
	loading: false,
	currentFilter: '',
}

export const fetchEpisodes = createAsyncThunk(
	'episodes/fetchAll',
	async (
		{
			page,
			name,
			episode,
			filterValue,
		}: {
			page: number
			name?: string
			episode?: string
			filterValue: string
		},
		{ rejectWithValue }
	) => {
		try {
			const data = await getEpisodes(page, name, episode)
			return {
				data,
				filter: filterValue,
			}
		} catch (err) {
			const axiosError = err as AxiosError
			if (axiosError.response?.status === 404) {
				return {
					data: {
						info: { count: 0, pages: 0, next: null, prev: null },
						results: [],
					},
					filter: filterValue,
				}
			}
			const errorMessage = axiosError.message || 'Unknown error'
			return rejectWithValue(`Ошибка загрузки, ${errorMessage}`)
		}
	}
)

const episodesSlice = createSlice({
	name: 'episodes',
	initialState,
	reducers: {
		resetFilter: state => {
			state.currentFilter = ''
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchEpisodes.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchEpisodes.fulfilled, (state, action) => {
				state.loading = false
				const { data, filter } = action.payload
				const filtersChanged = filter !== state.currentFilter

				if (filtersChanged || action.meta.arg.page === 1) {
					state.data = data
					state.currentFilter = filter
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
			.addCase(fetchEpisodes.rejected, (state, action) => {
				state.loading = false
				state.error =
					typeof action.payload === 'string'
						? action.payload
						: 'Ошибка загрузки эпизодов'
				state.data = null
				state.currentFilter = ''
			})
	},
})

export const { resetFilter } = episodesSlice.actions
export default episodesSlice.reducer
