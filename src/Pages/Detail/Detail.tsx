import React, { FC, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchByDetailCocktail } from '../../store/slices/detailSlice'
import { IIngrList } from '../../store/modules'

const Detail: FC = () => {
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()
	const [query] = useState(searchParams.get('c'))
	const { detail, error, loading } = useAppSelector(state => state.detail)

	useEffect(() => {
		query && dispatch(fetchByDetailCocktail(query))
	}, [dispatch, query])

	const listIngredients: IIngrList = () => {
		const arr = []
		for (let key in detail) {
			if (key.includes('strIngredient') && detail[key] !== null) {
				arr.push(detail[key])
			}
		}
		return arr
	}
	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : error ? (
				<span className='error'>{error}</span>
			) : (
				<>
					<h1>{detail?.strDrink}</h1>
					<ol>
						{listIngredients().length > 0 &&
							listIngredients().map((el, i) => (
								<Link to={`/full-ingredient-info/${el}`} key={i}>
									{el}
								</Link>
							))}
					</ol>
				</>
			)}
		</div>
	)
}

export default Detail
