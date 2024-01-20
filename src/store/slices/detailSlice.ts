import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { cocktailsAPI } from '../../axios'
import { ICocktailData } from '../modules'

type DetailState = {
	detail: null | ICocktailData
	loading: boolean
	error: null | string | undefined
}

const initialState: DetailState = {
	detail: null,
	error: null,
	loading: false,
}

export const fetchByDetailCocktail = createAsyncThunk<
	ICocktailData,
	string,
	{ rejectValue: string }
>('details/fetchByDetailCocktail', async (id, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getFullCocktailInfo(id)
		// console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		const data = res.data.drinks[0]
		return data as ICocktailData
	} catch (error) {
		if (error instanceof AxiosError) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return rejectWithValue(message)
		}
		// unhandled non-AxiosError goes here
		throw error
	}
})

export const detailSlice = createSlice({
	name: 'details',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchByDetailCocktail.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByDetailCocktail.fulfilled, (state, action) => {
			state.detail = action.payload
			state.loading = false
		})
		addCase(fetchByDetailCocktail.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
	},
})

export default detailSlice.reducer
