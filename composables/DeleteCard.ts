import axios, { AxiosError } from 'axios'
import { URL_API } from '~/config'
export const useDeleteCard = async (
	cardId: number,
	token: string
): Promise<number | AxiosError> => {
	const url = `${URL_API}cards/`
	try {
		const response = await axios.delete(url + cardId, {
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
		})
		return response.status
	} catch (error: any) {
		return error
	}
}
