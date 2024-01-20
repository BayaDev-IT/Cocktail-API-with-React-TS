import React, { FC, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Output from '../../components/Output/Output'
import { useAppDispatch } from '../../store/hooks/hooks'
import { fetchByCocktails } from '../../store/slices/cocktailsSlice'

const Home: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchByCocktails())
	}, [dispatch])
	return (
		<div>
			<Header />
			<Output />
		</div>
	)
}

export default Home
