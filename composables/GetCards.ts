import axios, { AxiosError } from 'axios'
import { URL_API } from '~/config'
import type { Card } from '../types/types'
export const useGetCards = async (
	token: string
): Promise<Card[] | AxiosError> => {
	const url = `${URL_API}cards/`
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
		})
		return response.data
	} catch (error: any) {
		return error
	}
}
