import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CharacterDetailsPage from '../CharacterDetails/CharacterDetailsPage'
import CharactersPage from '../Characters/CharactersPage'
import EpisodesPage from '../Episodes/EpisodesPage'
import EpisodesDetailsPage from '../EpisodesDetails/EpisodesDetails'
import LocationPage from '../Location/LocationPage'
import LocationDetailsPage from '../LocationDetails/LocationDetailsPage'
import Layout from '../shared/Layout/Layout'

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/characters' element={<CharactersPage />} />
					<Route path='/characters/:id' element={<CharacterDetailsPage />} />
					<Route path='*' element={<CharactersPage />} />{' '}
					<Route path='/locations' element={<LocationPage />} />
					<Route path='/locations/:id' element={<LocationDetailsPage />} />
					<Route path='/episodes' element={<EpisodesPage />} />
					<Route path='/episodes/:id' element={<EpisodesDetailsPage />} />
				</Routes>
			</Layout>
		</Router>
	)
}

export default App
