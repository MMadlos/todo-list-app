import "./styles.css"
import { newUI, taskCardUI, taskPanelComponent } from ".//modules/DOM"
import { taskList } from "./modules/task.js"

newUI()

const content = document.getElementById("content")
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
		const dueDate = task.dueDate
		const hasDueDate = task.dueDate !== ""
		const projectName = task.project
		const hasProject = task.project !== ""
		const hasFileAttached = task.isFileAttached

		taskCard.title(taskTitle)
		taskCard.tickIcon(isCompleted)
		taskCard.iconImportant(isImportant)

		taskCard.chipInfo(hasDueDate, "date", dueDate)
		taskCard.chipInfo(hasProject, "project", projectName)
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
		// Hover effect
		const tickIcon = card.querySelector(".task-info-container > i")
		tickIcon.addEventListener("mouseover", () => {
			tickIcon.classList.toggle("fa-square")
			tickIcon.classList.toggle("fa-square-check")
		})
		tickIcon.addEventListener("mouseout", () => {
			tickIcon.classList.toggle("fa-square")
			tickIcon.classList.toggle("fa-square-check")
		})

		// Get card index
		let cardIndex
		card.addEventListener("mouseenter", () => {
			cardIndex = card.dataset.index
		})

		// Event listeners
		card.addEventListener("click", (e) => {
			const taskFromList = taskList[cardIndex]

			const taskPanel = document.getElementById("task-panel")
			const isTaskPanelOpened = taskPanel ? true : false
			const isCardSelected = card.hasAttribute("card-selected")

			const clickedElement = e.target
			const isTickIcon = clickedElement == tickIcon
			const isStarIcon = clickedElement.classList.contains("fa-star")

			if (isTickIcon) {
				const isTaskCompleted = taskFromList.isCompleted
				isTaskCompleted ? (taskFromList.isCompleted = false) : (taskFromList.isCompleted = true)

				tickIcon.classList.toggle("fa-solid")
				tickIcon.classList.toggle("fa-regular")
				tickIcon.classList.toggle("fa-square-check")
				tickIcon.classList.toggle("fa-square")
				tickIcon.nextElementSibling.querySelector("p").classList.toggle("task-done")

				if (isTaskPanelOpened) updateTaskPanel()
			}

			if (isStarIcon) {
				const isTaskImportant = taskFromList.isImportant
				isTaskImportant ? (taskFromList.isImportant = false) : (taskFromList.isImportant = true)

				const starIcon = card.querySelector(".fa-star")
				starIcon.classList.toggle("fa-solid")
				starIcon.classList.toggle("fa-regular")
				starIcon.classList.toggle("is-important")

				if (isTaskPanelOpened) updateTaskPanel()
			}

			if (!isTickIcon && !isStarIcon) {
				if (!isCardSelected) {
					allCards.forEach((card) => {
						card.removeAttribute("card-selected")
					})

					card.setAttribute("card-selected", "")
				}

				isTaskPanelOpened ? updateTaskPanel() : openTaskPanel()
			}
		})
	})
}

function updateTaskList() {
	const allCards = cardListContainer.querySelectorAll(".task-card-container")
	allCards.forEach((card) => {
		card.remove()
	})
	displayTaskList()
}

// TASK-PANEL
function openTaskPanel() {
	const taskPanelDOM = taskPanelComponent()
	taskPanelDOM.display()

	// Determinar tarea seleccionada
	const cardSelected = document.querySelector("[card-selected]")
	const indexCard = cardSelected.dataset.index

	// Recoger propiedades de la tarea
	const taskFromList = taskList[indexCard]

	const isCompleted = taskFromList.isCompleted
	const taskTitle = taskFromList.title
	const taskSteps = taskFromList.steps
	const isImportant = taskFromList.isImportant
	const dueDate = taskFromList.dueDate
	const projectName = taskFromList.project
	const isFileAttached = taskFromList.isFileAttached
	const taskNote = taskFromList.note

	// Añadir propiedades a DOM.js
	taskPanelDOM.tickIcon(isCompleted)
	taskPanelDOM.taskTitle(taskTitle)
	taskPanelDOM.taskStepsList(taskSteps)
	taskPanelDOM.isTaskImportant(isImportant)
	taskPanelDOM.hasTaskDueDate(dueDate)
	taskPanelDOM.project(projectName)
	taskPanelDOM.file(isFileAttached)
	taskPanelDOM.note(taskNote)

	taskPanelEventListeners()
}

function updateTaskPanel() {
	const taskPanel = document.getElementById("task-panel")
	if (!taskPanel) return

	taskPanel.remove()
	openTaskPanel()
}

function taskPanelEventListeners() {
	const taskPanel = document.getElementById("task-panel")

	// Tick título

	// Tick pasos

	// Agrgar pasos

	// Marcar como importante

	// Añadir vencimiento

	// Añadir proyecto

	// Adjuntar archivo

	// Agregar una nota

	// Close task panel
	const btnClose = document.getElementById("btn-close-panel")
	btnClose.addEventListener("click", () => {
		const cardSelected = document.querySelector("[card-selected]")
		cardSelected.toggleAttribute("card-selected")

		taskPanel.remove()
	})
}
