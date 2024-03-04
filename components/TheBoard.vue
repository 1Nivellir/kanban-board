<script lang="ts" setup>
import { useMyCardsStore } from '#imports'
import { listArray } from '@/helpers/dataWrapper'
import type { Card } from '~/types/types'

const cards = computed(() => useMyCardsStore().cards)
const cardStore = useMyCardsStore()
const text = ref('')
const addEvent = async (col: string, index: number) => {
	const token = useMyUserStore().getToken
	const data = {
		row: col,
		text: text.value,
	}
	if (!token) return
	await useMyCardsStore().createCard(data, token)
	toggleCardForm(index)
}
onMounted(async () => {
	const token = useMyUserStore().getToken
	if (!token) return
	await cardStore.getCards(token)
})
const handleDragOver = (event: DragEvent) => {
	event.preventDefault()
}
const handleDragStart = (event: DragEvent, card: Card) => {
	const id = card.id.toString()
	if (event.dataTransfer) event.dataTransfer.setData('text/plain', id)
}

const handleDrop = async (event: DragEvent, row: string) => {
	if (!event.dataTransfer) return
	const token = useMyUserStore().getToken
	const cardId = event.dataTransfer.getData('text/plain')
	const card = cards.value.find((card) => card.id === parseInt(cardId))
	if (card) {
		card.row = row
		if (!token) return
		await cardStore.updateCard(card, token)
	}
}
const showCardForm = ref(Array(listArray.length).fill(false))
const toggleCardForm = (index: number) => {
	showCardForm.value[index] = !showCardForm.value[index]
}
</script>

<template>
	<div class="container">
		<div class="board__wrapper board">
			<div
				v-for="(item, index) in listArray"
				:key="item.row"
				:class="item.className"
				@dragover="handleDragOver"
				@drop="(event) => handleDrop(event, item.row)"
			>
				<h2 :class="item.classTitle">{{ item.name }} (0)</h2>
				<form
					v-if="showCardForm[index]"
					class="board__form"
					@submit.prevent="addEvent(item.row, index)"
				>
					<textarea
						name=""
						id=""
						rows="10"
						class="board__textarea"
						v-model="text"
					></textarea>
					<button type="submit">Click</button>
				</form>
				<div
					v-for="card in cards"
					:key="card.row"
					v-show="card.row === item.row"
				>
					<div
						draggable="true"
						class="board__card"
						@dragstart="(event) => handleDragStart(event, card)"
					>
						{{ card.text }}
					</div>
				</div>
				<button class="board__btn" @click="toggleCardForm(index)">
					<Icon name="tdesign:add" size="28" />Добавить карточку
				</button>
			</div>
		</div>
	</div>
</template>

<style></style>
