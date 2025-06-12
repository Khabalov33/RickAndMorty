import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { fetchEpisodes } from '../store/slices/episodesSlice'
import type { AppDispatch, RootState } from '../store/store'

type PaginationState = {
	visibleCount: number
	currentPage: number
}

export const useEpisodesFilters = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { data } = useSelector((state: RootState) => state.episodes)

	const [filter, setFilter] = useState('')
	const [debouncedFilter] = useDebounce(filter, 500)

	const [pagination, setPagination] = useState<PaginationState>({
		visibleCount: 12,
		currentPage: 1,
	})

	const resetPagination = useCallback(() => {
		setPagination({ visibleCount: 12, currentPage: 1 })
	}, [])

	const handleFilterChange = useCallback(
		(value: string) => {
			setFilter(value)
			resetPagination()
		},
		[resetPagination]
	)

	const getFilterParams = useCallback((filterValue: string) => {
		if (!filterValue) return {}

		const upperValue = filterValue.toUpperCase()
		const isEpisodeCode =
			upperValue.startsWith('S') &&
			upperValue.split('').some(char => char >= '0' && char <= '9')

		if (isEpisodeCode) {
			return { episode: upperValue }
		}
		return { name: filterValue }
	}, [])

	useEffect(() => {
		const params = getFilterParams(debouncedFilter)
		dispatch(
			fetchEpisodes({
				page: 1,
				...params,
				filterValue: debouncedFilter,
			})
		)
	}, [debouncedFilter, dispatch, getFilterParams])

	useEffect(() => {
		if (pagination.currentPage > 1) {
			const params = getFilterParams(debouncedFilter)
			dispatch(
				fetchEpisodes({
					page: pagination.currentPage,
					...params,
					filterValue: debouncedFilter,
				})
			)
		}
	}, [pagination.currentPage, dispatch, debouncedFilter, getFilterParams])

	const handleLoadMore = useCallback(() => {
		const totalLoaded = data?.results?.length || 0

		if (data?.info.next) {
			setPagination(prev => ({
				visibleCount: Math.min(prev.visibleCount + 12, totalLoaded + 12),
				currentPage: prev.currentPage + 1,
			}))
		} else if (totalLoaded > pagination.visibleCount) {
			setPagination(prev => ({
				...prev,
				visibleCount: Math.min(prev.visibleCount + 12, totalLoaded),
			}))
		}
	}, [data, pagination.visibleCount])

	return useMemo(
		() => ({
			uiFilters: {
				filter,
			},
			visibleCount: pagination.visibleCount,
			setters: {
				setFilter: handleFilterChange,
			},
			handleLoadMore,
		}),
		[filter, pagination.visibleCount, handleFilterChange, handleLoadMore]
	)
}
