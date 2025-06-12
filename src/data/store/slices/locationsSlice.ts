import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import getLocations from '../../api/locations'
import type { ILocationResponse } from '../../models/location'

interface LocationsState {
	data: ILocationResponse | null
	loading: boolean
	error: string | null
	currentName: string | null
	currentType: string | null
	currentDimension: string | null
}

const initialState: LocationsState = {
	data: null,
	loading: false,
	error: null,
	currentName: null,
	currentType: null,
	currentDimension: null,
}

export const fetchLocation = createAsyncThunk(
	'location/fetchAll',
	async (
		{
			page,
			name,
			type,
			dimension,
		}: {
			page: number
			name?: string
			type?: string | null
			dimension?: string | null
		},
		{ rejectWithValue }
	) => {
		try {
			const data = await getLocations(page, name, type, dimension)

			return {
				data,
				name: name || '',
				type: type || null,
				dimension: dimension || null,
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
					type: type || null,
					dimension: dimension || null,
				}
			}

			const errorMessage = axiosError.message || 'Unknown error'
			return rejectWithValue(`Ошибка загрузки, ${errorMessage}`)
		}
	}
)

const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		resetFilter: state => {
			state.currentName = ''
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchLocation.pending, state => {
				state.loading = true
				state.error = null
			})

			.addCase(fetchLocation.fulfilled, (state, action) => {
				state.loading = false
				const { data, name, type, dimension } = action.payload

				const filtersChanged =
					name !== state.currentName ||
					type !== state.currentType ||
					dimension !== state.currentDimension

				if (filtersChanged || action.meta.arg.page === 1) {
					state.data = data
					state.currentName = name
					state.currentType = type
					state.currentDimension = dimension
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

			.addCase(fetchLocation.rejected, (state, action) => {
				state.loading = false
				state.error =
					typeof action.payload === 'string'
						? action.payload
						: 'Ошибка загрузки персонажей'

				state.data = null
				state.currentName = ''
				state.currentType = null
				state.currentDimension = null
			})
	},
})

export const { resetFilter } = locationSlice.actions
export default locationSlice.reducer
