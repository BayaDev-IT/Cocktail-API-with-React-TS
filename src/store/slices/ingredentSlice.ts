import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cocktailsAPI } from '../../axios'
import { AxiosError } from 'axios'
import { IIngredent } from '../modules'

type IngrState = {
	loading: boolean
	error: null | string | undefined
	ingredient: null | IIngredent
}

const initialState: IngrState = {
	error: null,
	loading: false,
	ingredient: null,
}

export const fetchIngrByName = createAsyncThunk<
	IIngredent,
	string,
	{ rejectValue: string }
>('ingredient/fetchIngrByName', async (id, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getIngrByName(id)
		// console.log(res)

		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.ingredients[0]
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

const ingredentSlice = createSlice({
	name: 'ingredient',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchIngrByName.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchIngrByName.fulfilled, (state, action) => {
			state.ingredient = action.payload
			state.loading = false
		})
		addCase(fetchIngrByName.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
	},
})

export default ingredentSlice.reducer
