import React, { FC, useEffect } from 'react'
import 'animate.css'
import Main from './components/Main/Main'
import './App.css'
import { useAppDispatch } from './store/hooks/hooks'
import { fetchByGlassList } from './store/slices/cocktailsSlice'

const App: FC = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchByGlassList())
	}, [])
	return (
		<div>
			<Main />
		</div>
	)
}

export default App
