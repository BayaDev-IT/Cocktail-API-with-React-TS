import React, { FC } from 'react'
import './CocktailCard.scss'
import { Link } from 'react-router-dom'
import { IDrink } from '../../store/modules'

const CocktailCard: FC<IDrink> = ({ idDrink, strDrink, strDrinkThumb }) => {
	return (
		<Link
			to={`/full-cocktail-info/${strDrink}?c=${idDrink}`}
			className='card animate__animated animate__backInUp animate__faster'
		>
			<img src={strDrinkThumb} alt={strDrink} />
			<h3 title={strDrink}>
				{strDrink.length > 15 ? strDrink.slice(0, 15) + '...' : strDrink}
			</h3>
		</Link>
	)
}

export default CocktailCard
