import { configureStore } from '@reduxjs/toolkit'
import cocktailsSlice from './slices/cocktailsSlice'
import detailSlice from './slices/detailSlice'
import ingredentSlice from './slices/ingredentSlice'

export const store = configureStore({
	reducer: {
		cocktails: cocktailsSlice,
		detail: detailSlice,
		ingredient: ingredentSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
