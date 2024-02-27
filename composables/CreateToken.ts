import axios from 'axios'
export const useCreateToken = () => {
	const url = 'https://trello.backend.tests.nekidaem.ru/api/v1/users/token/'
	let token = ref('')
	const createToken = async (user: any) => {
		const { data } = await axios.post(url, user, {
			headers: {
				Authorization: `Bearer`,
				'Content-Type': 'application/json',
			},
		})
		token.value = await data.access
		console.log(token)
	}
	return ref({ createToken, token })
}
