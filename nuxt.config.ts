export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['assets/styles/style.css'],

	modules: ['nuxt-socket-io', '@pinia/nuxt', 'nuxt-icon'],
	io: {
		sockets: [
			{
				name: 'main',
				url: 'http://localhost:3000',
			},
		],
	},
})
