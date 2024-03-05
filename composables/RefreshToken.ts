import axios from 'axios'
import { URL_API } from '~/config'
export const useRefreshToken = async (refreshToken: string) => {
	const url = `${URL_API}users/token/refresh/`
	try {
		const response = await axios.post(
			url,
			{ refresh: `${refreshToken}` },
			{
				headers: {
					Authorization: `Bearer`,

					'Content-Type': 'application/json',
				},
			}
		)
		return response.data.access
	} catch (error) {
		return error
	}
}
