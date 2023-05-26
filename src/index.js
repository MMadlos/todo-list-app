import "./styles.css"
import { newUI, taskCardUI } from ".//modules/DOM"
import { createTask, taskList } from "./modules/task.js"

newUI()

const cardListContainer = document.querySelector(".task-card-list-container")

function displayTaskList() {
	taskListDOM()
	cardEventListeners()
}
displayTaskList()

function taskListDOM() {
	taskList.forEach((task) => {
		const taskCard = taskCardUI()
		const taskCardDOM = taskCard.display()

		const taskTitle = task.title
		const isCompleted = task.isCompleted
		const isImportant = task.isImportant
		const hasDueDate = task.dueDate !== ""
		const hasProject = task.project !== ""
		const hasFileAttached = task.isFileAttached

		console.table(task)
		console.log(hasDueDate)

		taskCard.title(taskTitle)
		taskCard.tickIcon(isCompleted)
		taskCard.iconImportant(isImportant)

		taskCard.chipInfo(hasDueDate, "date")
		taskCard.chipInfo(hasProject, "project")
		taskCard.chipInfo(hasFileAttached, "file")

		taskCard.addChipSeparator()

		cardListContainer.append(taskCardDOM)

		const taskIndex = taskList.indexOf(task)
		taskCardDOM.dataset.index = taskIndex
	})
}

function cardEventListeners() {
	const allCards = cardListContainer.querySelectorAll(".task-card-container")
	allCards.forEach((card) => {
		let cardIndex
		card.addEventListener("mouseenter", () => {
			cardIndex = card.dataset.index
		})

		const tickIcon = card.querySelector(".task-info-container > i")
		const isTickIconNotCompleted = tickIcon.classList.contains("fa-square")

		if (isTickIconNotCompleted) {
			tickIcon.addEventListener("mouseover", () => {
				tickIcon.classList.toggle("fa-square")
				tickIcon.classList.toggle("fa-square-check")
			})
			tickIcon.addEventListener("mouseout", () => {
				tickIcon.classList.toggle("fa-square")
				tickIcon.classList.toggle("fa-square-check")
			})
		}

		card.addEventListener("click", (e) => {
			const taskFromList = taskList[cardIndex]

			const clickedElement = e.target
			const isTickIcon = clickedElement == tickIcon
			const isStarIcon = clickedElement.classList.contains("fa-star")

			if (isTickIcon) {
				const isTaskCompleted = taskFromList.isCompleted

				isTaskCompleted ? (taskFromList.isCompleted = false) : (taskFromList.isCompleted = true)
			}

			if (isStarIcon) {
				const isTaskImportant = taskFromList.isImportant
				isTaskImportant ? (taskFromList.isImportant = false) : (taskFromList.isImportant = true)
			}

			if (!isTickIcon && !isStarIcon) {
				const taskPanel = document.getElementById("task-panel")
				return taskPanel.classList.toggle("hide")
			}

			allCards.forEach((card) => {
				card.remove()
			})

			displayTaskList()
		})
	})
}
