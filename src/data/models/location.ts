export interface ILocation {
	id: number
	name: string
	type: string
	dimension: string
	residents: string[]
	url: string
	created: string
}

export interface ILocationResponse {
	info: {
		count: number
		pages: number
		next: string
		prev: boolean
	}
	results: ILocation[]
}
