import React, { type ReactNode } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

interface ILayoutProps {
	children?: ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
	return (
		<div className='app-container'>
			<Header />
			<main className='content'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
