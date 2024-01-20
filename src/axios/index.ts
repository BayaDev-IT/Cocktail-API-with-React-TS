import axios from 'axios'

const instanse = axios.create({
	baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const cocktailsAPI = {
	getAllCocktails() {
		return instanse.get('filter.php?c=Cocktail')
	},
	getFullCocktailInfo(id: string) {
		return instanse.get(`lookup.php?i=${id}`)
	},
	getIngrByName(value: string) {
		return instanse.get(`search.php?i=${value}`)
	},
	getCocktailByName(value: string) {
		return instanse.get(`search.php?s=${value}`)
	},
	getAlcohol(value: string) {
		return instanse.get(`filter.php?a=${value}`)
	},
	getRandomCocktail() {
		return instanse.get('random.php')
	},
	getByGlassList() {
		return instanse.get(`list.php?g=list`)
	},
	getCocktailByGlass(value: string) {
		return instanse.get(`filter.php?g=${value}`)
	},
}
