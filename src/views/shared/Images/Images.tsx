import React from 'react'

interface IImageProps {
	src: string
	alt: string
	width: number
	height: number
	className: string
}

export const Images: React.FC<IImageProps> = ({
	src,
	alt,
	width,
	height,
	className,
}) => {
	return (
		<img
			className={className}
			src={src}
			alt={alt}
			width={width}
			height={height}
		/>
	)
}
