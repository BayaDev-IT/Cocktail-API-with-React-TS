import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { useParams } from 'react-router-dom'
import { fetchIngrByName } from '../../store/slices/ingredentSlice'

const Ingredient: FC = () => {
	const dispatch = useAppDispatch()
	const { name } = useParams()
	const { error, ingredient, loading } = useAppSelector(
		state => state.ingredient
	)
	console.log(ingredient)

	useEffect(() => {
		name && dispatch(fetchIngrByName(name))
	}, [dispatch, name])
	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : error ? (
				<span>{error}</span>
			) : (
				<>
					<h1>{ingredient?.strIngredient}</h1>
					<p>Description: {ingredient?.strDescription}</p>
					<h3>Is Alcohol{ingredient?.strAlcohol}</h3>
				</>
			)}
		</div>
	)
}

export default Ingredient
