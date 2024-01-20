type IObjectKey = {
	[key: string]: string | null
}

export type IDrink = IObjectKey & {
	idDrink: string
	strDrink: string
	strDrinkThumb: string
}

export type ICocktailData = IDrink &
	IObjectKey & {
		strAlcoholic: string
		strGlass: string
		strIngredient1: null | string
		strIngredient2: null | string
		strIngredient3: null | string
		strIngredient4: null | string
		strIngredient5: null | string
		strIngredient6: null | string
		strIngredient7: null | string
		strIngredient8: null | string
		strIngredient9: null | string
		strIngredient10: null | string
		strIngredient11: null | string
		strIngredient12: null | string
		strIngredient13: null | string
		strIngredient14: null | string
		strIngredient15: null | string
		strInstructions: null | string
	}

export type IIngredent = {
	strAlcohol: string
	strDescription: null | string
	strIngredient: string
}

export type IGlass = {
	strGlass: string
}

export type IIngrList = () => (string | null)[]
