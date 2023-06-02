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

function taskPanelEventListeners() {
	const taskPanel = document.getElementById("task-panel")

	// CHECK ICON --> Hover effect
	const tickIcon = taskPanel.querySelector(".task-panel-title-container > i")
	;["mouseover", "mouseout"].forEach((event) => {
		tickIcon.addEventListener(event, () => {
			tickIcon.classList.toggle("fa-square")
			tickIcon.classList.toggle("fa-square-check")
		})
	})

	// TASK PANEL EVENTS
	const taskTitle = taskPanel.querySelector(".task-panel-title-container > input")
	taskPanel.addEventListener("click", (e) => {
		const btnClosePanel = document.getElementById("btn-close-panel")
		if (e.target === btnClosePanel) taskPanel.remove()

		if (e.target === tickIcon) {
			tickIcon.classList.toggle("fa-solid")
			tickIcon.classList.toggle("fa-regular")
			tickIcon.classList.toggle("fa-square-check")
			tickIcon.classList.toggle("fa-square")

			taskTitle.classList.toggle("task-done")
		}

		const tickIconStep = e.target.closest(".task-step-container > i")
		if (tickIconStep) {
			tickIconStep.classList.toggle("fa-solid")
			tickIconStep.classList.toggle("fa-regular")
			tickIconStep.classList.toggle("fa-square-check")
			tickIconStep.classList.toggle("fa-square")

			tickIconStep.nextElementSibling.classList.toggle("task-done")
		}

		const taskDetailsItemContainer = e.target.closest(".task-details-item-container")
		if (taskDetailsItemContainer) {
			const itemType = taskDetailsItemContainer.dataset.itemType

			if (itemType === "important" || itemType === "due-date" || itemType === "attach-file") {
				const iconClose = taskDetailsItemContainer.querySelector(".fa-xmark")
				const isIconCloseHidden = iconClose.classList.contains("hide") ? true : false

				if (!isIconCloseHidden && e.target !== iconClose) return

				const text = taskDetailsItemContainer.querySelector("p")

				if (itemType === "important") {
					const _icon = taskDetailsItemContainer.querySelector(".fa-star")
					_icon.classList.toggle("is-important")
					_icon.classList.toggle("fa-solid")
					_icon.classList.toggle("fa-regular")

					text.textContent = isIconCloseHidden ? "Marcado como importante" : "Marcar como importante"
				}

				if (itemType === "due-date") text.textContent = isIconCloseHidden ? `Vence el "xxxx"` : "Añadir vencimiento"
				if (itemType === "attach-file") text.textContent = isIconCloseHidden ? `Archivo adjunto` : "Adjuntar archivo"

				iconClose.classList.toggle("hide")
				taskDetailsItemContainer.querySelector(".task-details-info-container").classList.toggle("selected")
			}

			if (itemType === "project-name") {
				const text = taskDetailsItemContainer.querySelector("p")
				const iconChevron = taskDetailsItemContainer.querySelector(".fa-chevron-down")
					? taskDetailsItemContainer.querySelector(".fa-chevron-down")
					: taskDetailsItemContainer.querySelector(".fa-chevron-right")

				text.textContent = taskDetailsItemContainer.querySelector(".fa-chevron-down") ? "Seleccionar proyecto" : "Tutorial"

				taskDetailsItemContainer.querySelector(".task-details-info-container").classList.toggle("selected")

				iconChevron.classList.toggle("fa-chevron-down")
				iconChevron.classList.toggle("fa-chevron-right")
			}
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
