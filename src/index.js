import "./styles.css"
import { newUI, taskCardUI, taskPanelComponent } from ".//modules/DOM"
import { taskList } from "./modules/task.js"

newUI()

const cardListContainer = document.querySelector(".task-card-list-container")
displayTaskList()

function displayTaskList() {
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

	cardEventListeners()
}

function cardEventListeners() {
	const allCards = cardListContainer.querySelectorAll(".task-card-container")
	allCards.forEach((card) => {
		// Hover effect
		const tickIcon = card.querySelector(".task-info-container > i")
		;["mouseover", "mouseout"].forEach((event) => {
			tickIcon.addEventListener(event, () => {
				tickIcon.classList.toggle("fa-square")
				tickIcon.classList.toggle("fa-square-check")
			})
		})

		let cardIndex
		card.onmouseenter = () => {
			cardIndex = card.dataset.index
		}

		// Event listeners
		card.addEventListener("click", (e) => {
			const taskFromList = taskList[cardIndex]

			const taskPanel = document.getElementById("task-panel")
			const isTaskPanelOpened = taskPanel ? true : false
			const isCardSelected = card.hasAttribute("card-selected")

			const clickedElement = e.target
			const isTickIcon = clickedElement == tickIcon
			const isStarIcon = clickedElement.classList.contains("fa-star")

			if (!isCardSelected && !isStarIcon && !isTickIcon) {
				allCards.forEach((card) => {
					card.removeAttribute("card-selected")
				})

				card.setAttribute("card-selected", "")
			}

			if (isTickIcon) {
				const isTaskCompleted = taskFromList.isCompleted
				isTaskCompleted ? (taskFromList.isCompleted = false) : (taskFromList.isCompleted = true)

				tickIcon.classList.toggle("fa-solid")
				tickIcon.classList.toggle("fa-regular")
				tickIcon.classList.toggle("fa-square-check")
				tickIcon.classList.toggle("fa-square")
				tickIcon.nextElementSibling.querySelector("p").classList.toggle("task-done")
			}

			if (isStarIcon) {
				const isTaskImportant = taskFromList.isImportant
				isTaskImportant ? (taskFromList.isImportant = false) : (taskFromList.isImportant = true)

				const starIcon = card.querySelector(".fa-star")
				starIcon.classList.toggle("fa-solid")
				starIcon.classList.toggle("fa-regular")
				starIcon.classList.toggle("is-important")
			}

			isTaskPanelOpened ? updateTaskPanel() : openTaskPanel()
		})
	})
}

// TASK-PANEL
function openTaskPanel() {
	const taskPanelDOM = taskPanelComponent()
	taskPanelDOM.display()

	const cardSelected = document.querySelector("[card-selected]")
	const indexCard = cardSelected.dataset.index

	const taskFromList = taskList[indexCard]
	const isCompleted = taskFromList.isCompleted
	const taskTitle = taskFromList.title
	const taskSteps = taskFromList.steps
	const isImportant = taskFromList.isImportant
	const dueDate = taskFromList.dueDate
	const projectName = taskFromList.project
	const isFileAttached = taskFromList.isFileAttached
	const taskNote = taskFromList.note

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

	// Check Icon --> Hover effect
	const tickIcon = taskPanel.querySelector(".task-panel-title-container > i")
	;["mouseover", "mouseout"].forEach((event) => {
		tickIcon.addEventListener(event, () => {
			tickIcon.classList.toggle("fa-square")
			tickIcon.classList.toggle("fa-square-check")
		})
	})

	// Dask details info
	const taskItemContainerAll = taskPanel.querySelectorAll(".task-details-item-container")

	const importantContainer = taskItemContainerAll[0]
	const importantInfoContainer = importantContainer.querySelector(".task-details-info-container")
	importantContainer.addEventListener("click", (e) => {
		const iconClose = importantContainer.querySelector(".fa-xmark")
		const isIconCloseHidden = iconClose.classList.contains("hide") ? true : false

		if (isIconCloseHidden) toggleStyles()
		if (e.target === iconClose) toggleStyles()

		function toggleStyles() {
			const iconStar = importantContainer.querySelector(".fa-star")
			const text = importantContainer.querySelector("p")

			iconStar.classList.toggle("is-important")
			iconStar.classList.toggle("fa-solid")
			iconStar.classList.toggle("fa-regular")

			text.textContent = isIconCloseHidden ? "Marcado como importante" : "Marcar como importante"
			importantInfoContainer.classList.toggle("selected")

			iconClose.classList.toggle("hide")

			const cardSelected = cardListContainer.querySelector("[card-selected")
			const starIconCardSelected = cardSelected.querySelector(".fa-star")
			starIconCardSelected.classList.toggle("fa-solid")
			starIconCardSelected.classList.toggle("fa-regular")
			starIconCardSelected.classList.toggle("is-important")
		}

		// TODO --> Update in taskFromTaskList
	})

	const dueDateContainer = taskItemContainerAll[1]
	const dueDateInfoContainer = dueDateContainer.querySelector(".task-details-info-container")
	dueDateContainer.addEventListener("click", (e) => {
		const iconClose = dueDateContainer.querySelector(".fa-xmark")
		const isIconCloseHidden = iconClose.classList.contains("hide") ? true : false

		if (isIconCloseHidden) toggleStyles()
		if (e.target === iconClose) toggleStyles()

		function toggleStyles() {
			const text = dueDateContainer.querySelector("p")
			text.textContent = isIconCloseHidden ? "Vencimiento" : "Añadir vencimiento"

			dueDateInfoContainer.classList.toggle("selected")
			iconClose.classList.toggle("hide")
		}

		// TODO --> Eliminar chip "Hoy" de la tarjeta
		// TODO --> Update in taskFromTaskList
	})

	// Bubbling elements
	const taskTitle = taskPanel.querySelector(".task-panel-title-container > input")
	taskPanel.addEventListener("click", (e) => {
		if (e.target === tickIcon) {
			tickIcon.classList.toggle("fa-solid")
			tickIcon.classList.toggle("fa-regular")
			tickIcon.classList.toggle("fa-square-check")
			tickIcon.classList.toggle("fa-square")

			taskTitle.classList.toggle("task-done")
		}

		// Tick pasos

		// Agregar pasos

		// Marcar como importante

		// Añadir vencimiento

		// Añadir proyecto

		// Adjuntar archivo

		// Agregar una nota

		// Save
		// Cuando haga click, guardo el valor del título
		const btnSave = document.getElementById("btn-save")
		if (e.target === btnSave || e.target === btnSave.querySelector("p")) {
			// Datos que quiero guardar
			/*
			const _getTaskPropertiesFromForm = {
				title: "",
				steps: [],
				isCompleted: false,
				isImportant: false,
				dueDate: "",
				project: "",
				isFileAttached: false,
				note: "",
			}
			*/

			// Tick icon
			const _isTaskCompleted = taskPanel.querySelector(".task-panel-title-container > i").classList.contains("task-done")

			// Title
			const _title = taskTitle.value
			console.log({ _isTaskCompleted, _title })

			// Steps

			// Importance
			// Due date
			// Project
			// Attached
			// Note
		}

		// Delete

		//Close task panel
		const btnClose = document.getElementById("btn-close-panel")
		if (e.target === btnClose) {
			const cardSelected = document.querySelector("[card-selected]")
			cardSelected.toggleAttribute("card-selected")

			taskPanel.remove()
		}
	})
}
