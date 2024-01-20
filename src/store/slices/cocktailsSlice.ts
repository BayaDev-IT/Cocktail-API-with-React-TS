import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { cocktailsAPI } from '../../axios'
import { IDrink, IGlass } from '../modules'

type CocktailState = {
	loading: boolean
	error: null | string | undefined
	list: IDrink[]
	listGlass: IGlass[]
}

const initialState: CocktailState = {
	error: null,
	loading: false,
	list: [],
	listGlass: [],
}

export const fetchByCocktails = createAsyncThunk<
	IDrink[],
	void,
	{ rejectValue: string }
>('cocktails/fetchByCocktails', async (_, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getAllCocktails()
		// console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		return res.data.drinks
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

export const fetchSearchByCocktailName = createAsyncThunk<
	IDrink[],
	string,
	{ rejectValue: string }
>('cocktails/fetchSearchByCocktailName', async (value, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getCocktailByName(value)
		console.log(res)

		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.drinks
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

export const fetchSelectByAlcohol = createAsyncThunk<
	IDrink[],
	string,
	{ rejectValue: string }
>('cocktails/fetchSelectByAlcohol', async (value, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getAlcohol(value)
		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.drinks
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

export const fetchRandomCocktail = createAsyncThunk<
	IDrink[],
	void,
	{ rejectValue: string }
>('cocktails/fetchRandomCocktail', async (_, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getRandomCocktail()
		console.log(res)

		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.drinks as IDrink[]
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

export const fetchByGlassList = createAsyncThunk<
	IGlass[],
	void,
	{ rejectValue: string }
>('cocktails/fetchByGlass', async (_, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getByGlassList()
		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.drinks as IGlass[]
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

export const fetchCocktailByGlass = createAsyncThunk<
	IDrink[],
	string,
	{ rejectValue: string }
>('cocktails/fetchCocktailByGlass', async (value, { rejectWithValue }) => {
	try {
		const res = await cocktailsAPI.getCocktailByGlass(value)
		if (res.status !== 200) {
			throw new Error('Server error')
		}
		return res.data.drinks as IDrink[]
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

const cocktailSlice = createSlice({
	name: 'cocktails',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchByCocktails.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByCocktails.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchByCocktails.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchSearchByCocktailName.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchSearchByCocktailName.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchSearchByCocktailName.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchSelectByAlcohol.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchSelectByAlcohol.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchSelectByAlcohol.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchRandomCocktail.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchRandomCocktail.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchRandomCocktail.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchByGlassList.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByGlassList.fulfilled, (state, action) => {
			state.listGlass = action.payload
			state.loading = false
		})
		addCase(fetchByGlassList.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchCocktailByGlass.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchCocktailByGlass.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchCocktailByGlass.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
	},
})

export default cocktailSlice.reducer
