import React from 'react'
import { Link } from 'react-router-dom'
import type { ILocation } from '../../../../data/models/location'
import styles from './LocationCard.module.scss'

interface ILocationCardProps {
	location: ILocation
}

const LocationCard: React.FC<ILocationCardProps> = ({ location }) => {
	return (
		<Link to={`/locations/${location.id}`}>
			<div className={styles.locationCard}>
				<h3 className={styles.locationCard__title}>{location.name}</h3>
				<span className={styles.locationCard__subtitle}>{location.type}</span>
			</div>
		</Link>
	)
}

export default LocationCard
