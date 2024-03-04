import axios, { AxiosError } from 'axios'
import { URL_API } from '~/config'
export const useCreateToken = async (
	user: any
): Promise<string | AxiosError> => {
	const url = `${URL_API}users/token/`
	try {
		const response = await axios.post(url, user, {
			headers: {
				Authorization: `Bearer`,
				'Content-Type': 'application/json',
			},
		})
		console.log(response.data)
		return response.data.access
	} catch (error: any) {
		console.log(error)
		return error
	}
}
