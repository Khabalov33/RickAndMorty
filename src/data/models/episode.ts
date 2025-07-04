export interface IEpisodes {
	id: number
	name: string
	air_date: string
	episode: string
	characters: string[]
	url: string
	created: string
}

export interface IEpisodesResponse {
	info: {
		count: number
		pages: number
		next: string | null
		prev: string | null
	}
	results: IEpisodes[]
}
