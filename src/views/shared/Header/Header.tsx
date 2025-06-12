import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/header-logo.png'
import '../../../Assets/styles/global/_container.scss'
import styles from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<div className='container'>
				<div className={styles.header__wrapper}>
					<Link className={styles.header__logo} to={''} aria-hidden='true'>
						<img
							className={styles.header__logo_img}
							src={logo}
							alt='логотип сайта'
							width={46}
							height={49}
						/>
					</Link>
					<ul className={styles.header__list}>
						<li className={styles.header__list_item}>
							<Link className={styles.header__list_link} to={'/characters'}>
								Characters
							</Link>
						</li>
						<li className={styles.header__list_item}>
							<Link className={styles.header__list_link} to={'/locations'}>
								Locations
							</Link>
						</li>
						<li className={styles.header__list_item}>
							<Link className={styles.header__list_link} to={'/episodes'}>
								Episodes
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header
