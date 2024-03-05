import axios, { AxiosError } from 'axios'
import { URL_API } from '~/config'
import type { User, CreateUser } from '~/types/types'

export const useCreateUser = async (
	user: User
): Promise<CreateUser | AxiosError> => {
	const url = `${URL_API}users/create/`

	try {
		const response = await axios.post(url, user, {
			headers: {
				Authorization: `Bearer`,
				'Content-Type': 'application/json',
			},
		})
		return response.data
	} catch (error: any) {
		return error
	}
}
