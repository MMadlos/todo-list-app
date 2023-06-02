import "./styles.css"
import { newUI, taskCardUI, taskPanelComponent, toggleAddTask } from ".//modules/DOM"
import { taskList } from "./modules/task.js"
import { createButton } from "./modules/icons"

newUI()
const taskCardArray = []
const cardListContainer = document.querySelector(".task-card-list-container")

displayTaskList()

function displayTaskList() {
	taskList.forEach((task) => {
		const taskCard = taskCardUI()
		const taskCardDOM = taskCard.display()
		cardListContainer.append(taskCardDOM)

		taskCardArray.push(taskCard)

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
		taskCard.chipsSeparator()

		const taskIndex = taskList.indexOf(task)
		taskCardDOM.dataset.index = taskIndex
	})

	cardEventListeners()
	addNewTaskBtn()
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

				taskFromList.isCompleted = isTaskCompleted ? false : true

				tickIcon.classList.toggle("fa-solid")
				tickIcon.classList.toggle("fa-regular")
				tickIcon.classList.toggle("fa-square-check")
				tickIcon.classList.toggle("fa-square")
				tickIcon.nextElementSibling.querySelector("p").classList.toggle("task-done")

				isCardSelected ?? updateTaskPanel()
				return
			}

			if (isStarIcon) {
				const isTaskImportant = taskFromList.isImportant

				taskFromList.isImprotant = isTaskImportant ? false : true

				const starIcon = card.querySelector(".fa-star")
				starIcon.classList.toggle("fa-solid")
				starIcon.classList.toggle("fa-regular")
				starIcon.classList.toggle("is-important")

				isCardSelected ?? updateTaskPanel()
				return
			}

			if (!isTaskPanelOpened) openTaskPanel()
			if (isTaskPanelOpened && !isCardSelected) updateTaskPanel()
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
	taskPanel.remove()

	openTaskPanel()
}
function toggleClasses(element, ...classes) {
	const _element = element
	const _classes = [...classes]

	for (let _class of _classes) {
		_element.classList.toggle(_class)
	}
}

function taskPanelEventListeners() {
	const taskPanel = document.getElementById("task-panel")

	// CHECK ICON --> Hover effect
	;["mouseover", "mouseout"].forEach((event) => {
		const taskContainer = taskPanel.querySelector(".task-steps-container")
		taskContainer.addEventListener(event, (e) => {
			const isTickIcon = e.target.closest(".fa-square-check") || e.target.closest(".fa-square")
			if (isTickIcon) toggleClasses(isTickIcon, "fa-square", "fa-square-check")
		})
	})

	// TASK PANEL EVENTS
	taskPanel.addEventListener("click", (e) => {
		const btnClosePanel = e.target.closest("#btn-close-panel")
		const tickIcon = e.target.closest("i.fa-square") || e.target.closest("i.fa-square-check")

		if (btnClosePanel) taskPanel.remove()

		if (tickIcon) {
			toggleClasses(tickIcon, "fa-solid", "fa-regular", "fa-square-check", "fa-square")
			tickIcon.nextElementSibling.classList.toggle("task-done")
		}

		// TASK DETAILS
		const taskDetailsItemContainer = e.target.closest(".task-details-item-container")
		if (taskDetailsItemContainer) {
			const itemType = taskDetailsItemContainer.dataset.itemType
			const detailsContainer = taskDetailsItemContainer.querySelector(".task-details-info-container")
			const isContainerSelected = detailsContainer.classList.contains("selected")

			const taskDetailtext = taskDetailsItemContainer.querySelector("p")
			const iconStar = taskDetailsItemContainer.querySelector(".fa-star")
			const iconClose = taskDetailsItemContainer.querySelector(".fa-xmark")
			const iconChevron = taskDetailsItemContainer.querySelector(".fa-chevron-down")
				? taskDetailsItemContainer.querySelector(".fa-chevron-down")
				: taskDetailsItemContainer.querySelector(".fa-chevron-right")

			if (itemType === "project-name") {
				toggleClasses(iconChevron, "fa-chevron-down", "fa-chevron-right")
				detailsContainer.classList.toggle("selected")
				taskDetailtext.textContent = isContainerSelected ? "Seleccionar proyecto" : "Tutorial"

				return
			}

			if (isContainerSelected && e.target !== iconClose) return
			if (itemType === "important") toggleClasses(iconStar, "is-important", "fa-solid", "fa-regular")

			iconClose.classList.toggle("hide")
			detailsContainer.classList.toggle("selected")

			const _typeText = {
				important: isContainerSelected ? "Marcar como importante" : "Marcado como importante",
				"due-date": isContainerSelected ? "Añadir vencimiento" : `Vence el "xxxx"`,
				"attach-file": isContainerSelected ? "Adjuntar archivo" : `Archivo adjunto`,
			}
			taskDetailtext.textContent = _typeText[itemType]
		}

		const btnSave = e.target.closest("#btn-save")
		if (btnSave) {
			const _getValues = {
				title: "",
				steps: [],
				isCompleted: false,
				isImportant: false,
				dueDate: "",
				project: "",
				isFileAttached: false,
				note: "",
			}

			// Properties from form:
			const allSteps = taskPanel.querySelectorAll(".task-step-container")
			const stepsList = []
			allSteps.forEach((step) => {
				const isCompleted = step.querySelector("input").classList.contains("task-done")
				const stepName = step.querySelector("input").value

				const stepObject = { isCompleted, stepName }
				stepsList.push(stepObject)
			})

			const taskTitle = taskPanel.querySelector(".task-panel-title-container > input")

			_getValues.title = taskTitle.value
			_getValues.steps = stepsList
			_getValues.isCompleted = taskPanel.querySelector(".task-panel-title-container > input").classList.contains("task-done")
			_getValues.isImportant = taskPanel.querySelector(`[data-item-type="important"] > div`).classList.contains("selected")
			_getValues.dueDate = taskPanel.querySelector(`[data-item-type="due-date"] > div`).classList.contains("selected")
			_getValues.project = taskPanel.querySelector(`[data-item-type="project-name"] > div`).classList.contains("selected")
				? taskPanel.querySelector(`[data-item-type="project-name"] > div > p`).textContent
				: ""
			_getValues.isFileAttached = taskPanel.querySelector(`[data-item-type="attach-file"] > div`).classList.contains("selected")
			_getValues.note = taskPanel.querySelector("#add-note-field").value

			// Add values to the task in the TaskList
			const cardSelected = document.querySelector("[card-selected]")
			const indexCard = cardSelected.dataset.index

			taskList[indexCard] = _getValues

			cardListContainer.querySelectorAll(".task-card-container").forEach((card) => {
				card.remove()
			})
			displayTaskList()

			taskPanel.remove()
		}
	})
}

function addNewTaskBtn() {
	/*
	(Cuando el input está cerrado) Cuando hago click en añadir tarea -> Se elimina el contenedor y se añade el input

	Cuando el input está abierto y hago click fuera de él, se elimina y se añade el btn

	Cuando el input está abierto y hago click en él, no pasa nada
	*/

	const addTaskBtn = document.getElementById("btn-add-task")
	let isTaskInputOpened = false

	if (!isTaskInputOpened) {
		addTaskBtn.addEventListener("click", (e) => {
			toggleAddTask()
			e.stopPropagation()
			isTaskInputOpened = true
		})
	}

	const content = document.getElementById("content")
	content.addEventListener("click", (e) => {
		if (isTaskInputOpened) {
			const newTaskInputContainer = document.querySelector(".new-task-input-container")
			const _inputTargetContainer = e.target.closest(".new-task-input-container")
			const isInputElement = newTaskInputContainer === _inputTargetContainer
			e.stopPropagation()

			if (!isInputElement) {
				const mainSection = document.getElementById("main-section")
				newTaskInputContainer.remove()

				const btnAddTask = createButton("addTask")
				mainSection.appendChild(btnAddTask)
				addNewTaskBtn()
				e.stopPropagation()
			}
		}
	})
}
