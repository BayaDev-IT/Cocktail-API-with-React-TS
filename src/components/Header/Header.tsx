import React, { FC, FormEventHandler, ChangeEventHandler } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import {
	fetchByCocktails,
	fetchCocktailByGlass,
	fetchRandomCocktail,
	fetchSearchByCocktailName,
	fetchSelectByAlcohol,
} from '../../store/slices/cocktailsSlice'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { TextField } from '@mui/material'
import s from './Header.module.scss'

const Header: FC = () => {
	const [value, setValue] = React.useState('')
	const dispatch = useAppDispatch()
	const { listGlass } = useAppSelector(state => state.cocktails)

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		if (value.trim().length) {
			dispatch(fetchSearchByCocktailName(value))
		}
	}

	const handleSelectAlcohol: ChangeEventHandler<HTMLSelectElement> = e => {
		const option = e.target.value
		if (option === 'ALL') {
			dispatch(fetchByCocktails())
		} else {
			dispatch(fetchSelectByAlcohol(option))
		}
	}
	const toggleHandleGlass: ChangeEventHandler<HTMLSelectElement> = e => {
		const name = e.target.value
		if (name === 'ALL') {
			dispatch(fetchByCocktails())
		} else {
			dispatch(fetchCocktailByGlass(name))
		}
	}

	const handleClickRandom = () => {
		dispatch(fetchRandomCocktail())
	}
	return (
		<header className={s.header}>
			<form onSubmit={handleSubmit} className={s.form}>
				<TextField
					id='standard-basic'
					label='Search cocktail'
					variant='standard'
					value={value}
					onChange={e => setValue(e.target.value)}
					type='text'
					placeholder='Search cocktail'
				/>
				<Stack direction='row' spacing={1}>
					<Button variant='contained'>Search</Button>
				</Stack>
			</form>
			<select onChange={handleSelectAlcohol} className={s.select}>
				<option value='ALL'>ALL</option>
				<option value='Alcoholic'>Alcoholic</option>
				<option value='Non_Alcoholic'>Non_Alcoholic</option>
			</select>
			{listGlass.length > 0 && (
				<select onChange={toggleHandleGlass}>
					<option value='ALL'>ALL</option>
					{listGlass.map((el, i) => (
						<option key={i} value={el.strGlass}>
							{el.strGlass}
						</option>
					))}
				</select>
			)}

			<Button onClick={handleClickRandom} variant='contained' color='success'>
				I'll be lucky
			</Button>
		</header>
	)
}

export default Header
