import "./styles.css"
import { newUI, taskCardUI } from ".//modules/DOM"
import { createTask, taskList } from "./modules/task.js"

const firstTask = createTask("First Task")
const secondTask = createTask("Second Task")
secondTask.properties.isCompleted = true
secondTask.properties.isImportant = true
secondTask.properties.dueDate = "Mañana"
secondTask.properties.project = "Ejemplo"
secondTask.properties.isFileAttached = true

// Display all tasks in taskList

newUI()

const cardListContainer = document.querySelector(".task-card-list-container")

displayTaskList()

function displayTaskList() {
	taskListDOM()
	cardEventListeners()
}

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

		card.addEventListener("click", (e) => {
			// TODO -> Que cambie sólo al hacer click en el icono

			const clickedElement = e.target
			const isTickIcon = clickedElement.classList.contains("fa-square") || clickedElement.classList.contains("fa-square-check")

			if (isTickIcon) {
				const taskFromList = taskList[cardIndex]
				const isTaskCompleted = taskFromList.isCompleted

				isTaskCompleted ? (taskFromList.isCompleted = false) : (taskFromList.isCompleted = true)

				allCards.forEach((card) => {
					card.remove()
				})

				displayTaskList()
			}
		})
	})
}
