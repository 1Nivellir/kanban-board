import axios, { AxiosError } from 'axios'
export const useCreateToken = async (
	user: any
): Promise<string | AxiosError> => {
	const url = 'https://trello.backend.tests.nekidaem.ru/api/v1/users/token/'
	try {
		const response = await axios.post(url, user, {
			headers: {
				Authorization: `Bearer`,
				'Content-Type': 'application/json',
			},
		})
		return response.data.access
	} catch (error: any) {
		console.log(error)
		return error
	}
}
