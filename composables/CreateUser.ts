import axios from 'axios'
export const useCreateUser = () => {
	const url = 'https://trello.backend.tests.nekidaem.ru/api/v1/users/create/'
	let user = {}
	const createUser = async (user: any) => {
		const { data } = await axios.post(url, user, {
			headers: {
				Authorization: `Bearer`,
				'Content-Type': 'application/json',
			},
		})
		user = await data
	}
	return ref({ createUser, user })
}
