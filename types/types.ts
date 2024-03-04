export type Card = {
	id: number
	text: string
	row: string
	seq_num: number
}

export type CreateCard = Omit<Card, 'id' | 'seq_num'>
