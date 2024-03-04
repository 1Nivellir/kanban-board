<script lang="ts" setup>
import { useMyCardsStore } from '#imports'
import { listArray } from '@/helpers/dataWrapper'
import { useMyUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import type { Card } from '~/types/types'

const cards = computed(() => useMyCardsStore().cards)
const router = useRouter()
const cardStore = useMyCardsStore()
const userStore = useMyUserStore()
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
	let token = userStore.getToken
	if (token) {
		await cardStore.getCards(token)
	} else {
		const tokenLs = localStorage.getItem('token')
		if (!tokenLs) return
		userStore.createToken(tokenLs)
		await cardStore.getCards(tokenLs)
	}
})
watch(
	() => cardStore.getError.length > 0,
	(newError) => {
		localStorage.removeItem('token')
		router.push('/')
	}
)
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

const deleteCard = async (id: number) => {
	const token = useMyUserStore().getToken
	if (!token) return
	await cardStore.deleteCard(id, token)
}
const getLength = (row: string) => {
	const card = cards.value.filter((card) => card.row === row)
	return card.length
}
</script>

<template>
	<TheHeader />
	<div class="container">
		<div class="board__wrapper board">
			<div
				v-for="(item, index) in listArray"
				:key="item.row"
				:class="item.className"
				@dragover="handleDragOver"
				@drop="(event) => handleDrop(event, item.row)"
			>
				<h2 :class="item.classTitle">
					{{ item.name }} ({{ getLength(item.row) }})
				</h2>
				<form
					v-if="showCardForm[index]"
					class="board__form"
					@submit.prevent="addEvent(item.row, index)"
				>
					<textarea
						name=""
						id=""
						rows="7"
						placeholder="Введите заголовок карточки для этой карточки"
						class="board__textarea"
						v-model="text"
					></textarea>
					<button type="submit" class="board__submit">Добавить карточку</button>
				</form>
				<div
					class="board__cards-wrapper"
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

						<button
							@click.prevent="deleteCard(card.id)"
							class="board__btn-delete"
						>
							<Icon name="material-symbols:close-small" size="28" />
						</button>
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
