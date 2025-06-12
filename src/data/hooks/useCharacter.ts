import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { fetchCharacters } from '../store/slices/characterSlice'
import type { AppDispatch, RootState } from '../store/store'

type PaginationState = {
	visibleCount: number
	currentPage: number
}

export type CharacterParams = {
	name: string
	species: string | null
	gender: string | null
	status: string | null
}

export const useCharacter = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { data } = useSelector((state: RootState) => state.characters)

	const [name, setName] = useState('')
	const [species, setSpecies] = useState<string | null>(null)
	const [gender, setGender] = useState<string | null>(null)
	const [status, setStatus] = useState<string | null>(null)

	const [debouncedName] = useDebounce(name, 500)

	const [pagination, setPagination] = useState<PaginationState>({
		visibleCount: 8,
		currentPage: 1,
	})

	const resetPagination = useCallback(() => {
		setPagination({ visibleCount: 8, currentPage: 1 })
	}, [])

	const handleNameChange = useCallback(
		(value: string) => {
			setName(value)
			resetPagination()
		},
		[resetPagination]
	)

	const handleSpeciesChange = useCallback(
		(value: string | null) => {
			setSpecies(value)
			resetPagination()
		},
		[resetPagination]
	)

	const handleGenderChange = useCallback(
		(value: string | null) => {
			setGender(value)
			resetPagination()
		},
		[resetPagination]
	)

	const handleStatusChange = useCallback(
		(value: string | null) => {
			setStatus(value)
			resetPagination()
		},
		[resetPagination]
	)

	useEffect(() => {
		dispatch(
			fetchCharacters({
				page: 1,
				name: debouncedName,
				species,
				gender,
				status,
			})
		)
	}, [debouncedName, species, gender, status, dispatch])

	useEffect(() => {
		if (pagination.currentPage > 1) {
			dispatch(
				fetchCharacters({
					page: pagination.currentPage,
					name: debouncedName,
					species,
					gender,
					status,
				})
			)
		}
	}, [pagination.currentPage, dispatch, debouncedName, species, gender, status])

	const handleLoadMore = useCallback(() => {
		const totalLoaded = data?.results?.length || 0

		if (data?.info.next) {
			setPagination(prev => ({
				visibleCount: Math.min(prev.visibleCount + 8, totalLoaded + 8),
				currentPage: prev.currentPage + 1,
			}))
		} else if (totalLoaded > pagination.visibleCount) {
			setPagination(prev => ({
				...prev,
				visibleCount: Math.min(prev.visibleCount + 8, totalLoaded),
			}))
		}
	}, [data, pagination.visibleCount])

	return useMemo(
		() => ({
			uiFilters: {
				name,
				species,
				gender,
				status,
			},
			visibleCount: pagination.visibleCount,
			setters: {
				setName: handleNameChange,
				setSpecies: handleSpeciesChange,
				setGender: handleGenderChange,
				setStatus: handleStatusChange,
			},
			handleLoadMore,
		}),
		[
			name,
			species,
			gender,
			status,
			pagination.visibleCount,
			handleNameChange,
			handleSpeciesChange,
			handleGenderChange,
			handleStatusChange,
			handleLoadMore,
		]
	)
}
