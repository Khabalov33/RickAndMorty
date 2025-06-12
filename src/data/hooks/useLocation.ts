import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { fetchLocation } from '../store/slices/locationsSlice'
import type { AppDispatch, RootState } from '../store/store'

type PaginationState = {
	visibleCount: number
	currentPage: number
}

export type LocationFilterParams = {
	name: string
	type: string | null
	dimension: string | null
}

export const useLocation = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { data } = useSelector((state: RootState) => state.locations)

	const [name, setName] = useState('')
	const [type, setType] = useState<string | null>(null)
	const [dimension, setDimension] = useState<string | null>(null)

	const [debouncedName] = useDebounce(name, 500)

	const [pagination, setPagination] = useState<PaginationState>({
		visibleCount: 12,
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

	const handleTypeChange = useCallback(
		(value: string | null) => {
			setType(value)
			resetPagination()
		},
		[resetPagination]
	)

	const handleDimensionChange = useCallback(
		(value: string | null) => {
			setDimension(value)
			resetPagination()
		},
		[resetPagination]
	)

	useEffect(() => {
		dispatch(
			fetchLocation({
				page: 1,
				name: debouncedName,
				type,
				dimension,
			})
		)
	}, [debouncedName, type, dimension, dispatch])

	useEffect(() => {
		if (pagination.currentPage > 1) {
			dispatch(
				fetchLocation({
					page: pagination.currentPage,
					name: debouncedName,
					type,
					dimension,
				})
			)
		}
	}, [pagination.currentPage, dispatch, debouncedName, type, dimension])

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
				type,
				dimension,
			},
			visibleCount: pagination.visibleCount,
			setters: {
				setName: handleNameChange,
				setType: handleTypeChange,
				setDimension: handleDimensionChange,
			},
			handleLoadMore,
		}),
		[
			name,
			type,
			dimension,
			pagination.visibleCount,
			handleNameChange,
			handleTypeChange,
			handleDimensionChange,
			handleLoadMore,
		]
	)
}
