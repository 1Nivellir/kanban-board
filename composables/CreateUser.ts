import axios from 'axios'
import { URL_API } from '~/config'

export const useCreateUser = () => {
	const url = `${URL_API}users/create/`
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
