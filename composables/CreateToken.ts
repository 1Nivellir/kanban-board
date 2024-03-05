import axios, { AxiosError } from 'axios'
import { URL_API } from '~/config'
import type { Token } from '~/types/types'
export const useCreateToken = async (
	user: any
): Promise<Token | AxiosError> => {
	const url = `${URL_API}users/token/`
	try {
		const response = await axios.post(url, user, {
			headers: {
				Authorization: `Bearer`,
				'Content-Type': 'application/json',
			},
		})
		console.log(response.data)
		return response.data
	} catch (error: any) {
		return error
	}
}
