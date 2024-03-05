import axios from 'axios'
import { URL_API } from '~/config'
import type { CreateUser, Token } from '~/types/types'
export const useCreateToken = async (
	user: CreateUser
): Promise<Token | string> => {
	const url = `${URL_API}users/token/`
	try {
		const response = await axios.post(url, user, {
			headers: {
				Authorization: `Bearer`,
				'Content-Type': 'application/json',
			},
		})
		return response.data
	} catch (error: any) {
		if (error.response.status === 401) {
			return 'Не найдена активная учетная запись с указанными учетными данными'
		}
		return error
	}
}
