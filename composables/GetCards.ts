import axios from 'axios'
import { URL_API } from '~/config'
import type { Card } from '../types/types'
export const useGetCards = async (token: string): Promise<Card[] | string> => {
	const url = `${URL_API}cards/`
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
		})
		console.log(response)
		return response.data
	} catch (error: any) {
		if (error.response.status === 401) {
			return 'Авторизуйтесь пожалуйста заново'
		}
		return error
	}
}
