<script lang="ts" setup>
import { listArray } from '@/helpers/dataWrapper'
interface Card {
	id: number
	row: string
	name: string
	// Add other properties as needed
}
const cards = ref<Card[]>([
	{
		id: 1,
		row: '1',
		name: 'Привет',
	},
	{
		id: 2,
		row: '2',
		name: 'Hi',
	},
])
const cardsArray = computed(() => cards.value)
const text = ref('')
const addEvent = (deta, index) => {
	console.log('work')
	const data = {
		row: deta,
		name: text.value,
	}
	cards.value.push(data)
	toggleCardForm(index)
}
const handleDragOver = (event: DragEvent) => {
	event.preventDefault()
	console.log(cards.value)
}
const handleDragStart = (event: DragEvent, card: Card) => {
	if (event.dataTransfer) event.dataTransfer.setData('text/plain', card.id)
}

const handleDrop = (event: DragEvent, row: string) => {
	if (!event.dataTransfer) return
	const cardId = event.dataTransfer.getData('text/plain')
	const card = cards.value.find((card) => card.id === parseInt(cardId))
	if (card) {
		card.row = row
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
					v-for="card in cardsArray"
					:key="card.row"
					v-show="card.row === item.row"
				>
					<div
						draggable="true"
						class="board__card"
						@dragstart="(event) => handleDragStart(event, card)"
					>
						{{ card.name }}
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
