import React, { useEffect, useRef, useState } from 'react'
import styles from './DropDownFilter.module.scss'

interface IDropDownFilterPops {
	options: string[]
	selectedValue: string | null
	onSelect: (value: string | null) => void
	placeholder: string
}

const DropDownFilter: React.FC<IDropDownFilterPops> = ({
	options,
	selectedValue,
	onSelect,
	placeholder,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleOptionClick = (option: string) => {
		if (selectedValue === option) {
			onSelect(null)
		} else {
			onSelect(option)
		}
		setIsOpen(false)
	}

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation()
		onSelect(null)
	}

	return (
		<div
			className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}
			onClick={() => setIsOpen(!isOpen)}
			ref={dropdownRef}
		>
			<div className={styles.dropdown__selected_value}>
				{selectedValue || placeholder}
				{selectedValue && (
					<button
						className={styles.dropdown__clear_button}
						onClick={handleClear}
					>
						&times;
					</button>
				)}
			</div>

			{isOpen && (
				<ul className={styles.dropdown__options_list}>
					{options.map(option => (
						<li
							key={option}
							className={`${styles.dropdown__option} ${
								selectedValue === option ? styles.selected : ''
							}`}
							onClick={() => handleOptionClick(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default DropDownFilter
