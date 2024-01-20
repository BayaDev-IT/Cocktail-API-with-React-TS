import React, { FC } from 'react'
import { useAppSelector } from '../../store/hooks/hooks'
import CocktailCard from '../CocktailCard/CocktailCard'
import './Output.scss'

const Output: FC = () => {
	const { loading, error, list } = useAppSelector(state => state.cocktails)

	return (
		<div className='cocktails-wrapper'>
			{loading ? (
				<h1>Loading...</h1>
			) : error ? (
				<span className='error animate__animated animate__animated'>
					{error}
				</span>
			) : (
				list.length > 0 &&
				list.map(el => <CocktailCard key={el.idDrink} {...el} />)
			)}
		</div>
	)
}

export default Output
