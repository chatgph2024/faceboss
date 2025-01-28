import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'faceboss | Social Media',
		short_name: 'faceboss',
		description: 'A full-stack social media web app built on NextJS 15 for the Next Fans',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '192x192',
				type: 'image/ico'
			}
		]
	}
}
