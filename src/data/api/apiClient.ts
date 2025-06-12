import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://rickandmortyapi.com/api/',
})

export default apiClient
