import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import Detail from '../../Pages/Detail/Detail'
import Ingredient from '../../Pages/Ingredient/Ingredient'

const Main: FC = () => {
	return (
		<main>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/full-cocktail-info/:name' element={<Detail />} />
				<Route path='/full-ingredient-info/:name' element={<Ingredient />} />
			</Routes>
		</main>
	)
}

export default Main
