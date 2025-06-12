import { configureStore } from '@reduxjs/toolkit'

import charactersReducer from './slices/characterSlice'
import episodesReducer from './slices/episodesSlice'
import locationsReducer from './slices/locationsSlice'

export const store = configureStore({
	reducer: {
		characters: charactersReducer,
		locations: locationsReducer,
		episodes: episodesReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
