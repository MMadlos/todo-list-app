import "./styles.css"
import { newUI, taskCardUI, taskPanelComponent, toggleAddTask } from ".//modules/DOM"
import { taskList, createTask } from "./modules/task.js"
import { createButton } from "./modules/icons"

newUI()
const cardListContainer = document.querySelector(".task-card-list-container")

displayTaskList()

function displayTaskList() {
	renderTaskList()
	cardEventListeners()
	addNewTaskBtn()
}

function renderTaskList() {
	taskList.forEach((task) => {
		const taskCard = taskCardUI()
		const taskCardDOM = taskCard.display()
		cardListContainer.append(taskCardDOM)

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
}

function updateTaskList() {
	removeTaskList()
	renderTaskList()
	cardEventListeners()
	addNewTaskBtn()
}

function removeTaskList() {
	cardListContainer.querySelectorAll(".task-card-container").forEach((card) => {
		card.remove()
	})
}

function cardEventListeners() {
	const allCards = cardListContainer.querySelectorAll(".task-card-container")
	allCards.forEach((card) => {
		const tickIcon = card.querySelector(".task-info-container > i")
		;["mouseover", "mouseout"].forEach((event) => {
			tickIcon.addEventListener(event, () => {
				toggleClasses(tickIcon, "fa-square", "fa-square-check")
			})
		})

		card.addEventListener("click", (e) => {
			const cardIndex = card.dataset.index
			const taskFromList = taskList[cardIndex]

			const isCardSelected = card.hasAttribute("card-selected")

			const clickedElement = e.target
			const isTickIcon = clickedElement == tickIcon
			const isStarIcon = e.target.closest(".fa-star")
			const taskText = tickIcon.nextElementSibling.querySelector("p")

			const isAnotherCardSelected = document.querySelector(`[card-selected]`) ? true : false
			const cardCurrentSelected = document.querySelector(`[card-selected]`) ?? false

			if (!isCardSelected && !isStarIcon && !isTickIcon) {
				card.setAttribute("card-selected", "")

				if (isAnotherCardSelected) {
					cardCurrentSelected.removeAttribute("card-selected")
					updateTaskPanel()
				}

				if (!isAnotherCardSelected) {
					openTaskPanel()
				}
			}

			if (isTickIcon) {
				toggleClasses(tickIcon, "fa-solid", "fa-regular", "fa-square-check", "fa-square")
				taskText.classList.toggle("task-done")
				taskFromList.isCompleted = !taskFromList.isCompleted
				return
			}

			if (isStarIcon) {
				toggleClasses(isStarIcon, "fa-solid", "fa-regular", "is-important")
				taskFromList.isImportant = !taskFromList.isImportant
				return
			}
		})
	})
}

// TASK-PANEL
function openTaskPanel() {
	renderTaskPanel()
	taskPanelEventListeners()
}

function renderTaskPanel() {
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
	;["mouseover", "mouseout"].forEach((event) => {
		const taskContainer = document.querySelector(".task-steps-container")
		taskContainer.addEventListener(event, (e) => {
			const isTickIcon = e.target.closest(".fa-square-check") || e.target.closest(".fa-square")
			if (isTickIcon) toggleClasses(isTickIcon, "fa-square", "fa-square-check")
		})
	})

	const taskPanel = document.getElementById("task-panel")
	taskPanel.addEventListener("click", (e) => {
		const isBtnClose = e.target.closest("#btn-close-panel")
		const isTickIcon = e.target.closest("i.fa-square") || e.target.closest("i.fa-square-check")
		const taskDetailsContainer = e.target.closest(".task-details-item-container")
		const isBtnSave = e.target.closest("#btn-save")

		if (isBtnClose) taskPanel.remove()

		if (isTickIcon) {
			toggleClasses(isTickIcon, "fa-solid", "fa-regular", "fa-square-check", "fa-square")
			const taskText = isTickIcon.nextElementSibling
			taskText.classList.toggle("task-done")
		}

		if (taskDetailsContainer) {
			const itemType = taskDetailsContainer.dataset.itemType
			const detailsContainer = taskDetailsContainer.querySelector(".task-details-info-container")
			const isContainerSelected = detailsContainer.classList.contains("selected")

			const taskDetailtext = taskDetailsContainer.querySelector("p")
			const iconStar = taskDetailsContainer.querySelector(".fa-star")
			const iconClose = taskDetailsContainer.querySelector(".fa-xmark")
			const iconChevron = taskDetailsContainer.querySelector(".fa-chevron-down")
				? taskDetailsContainer.querySelector(".fa-chevron-down")
				: taskDetailsContainer.querySelector(".fa-chevron-right")

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

		if (isBtnSave) {
			const taskTitle = taskPanel.querySelector(".task-panel-title-container > input")
			const importanceContainer = taskPanel.querySelector(`[data-item-type="important"] > div`)
			const dueDateContainer = taskPanel.querySelector(`[data-item-type="due-date"] > div`)
			const projectContainer = taskPanel.querySelector(`[data-item-type="project-name"] > div`)
			const fileContainer = taskPanel.querySelector(`[data-item-type="attach-file"] > div`)
			const noteContainer = taskPanel.querySelector("#add-note-field")
			const allSteps = document.querySelectorAll(".task-step-container")

			const _taskPanel = {
				title: taskTitle.value,
				steps: [],
				isCompleted: taskTitle.classList.contains("task-done"),
				isImportant: importanceContainer.classList.contains("selected"),
				dueDate: dueDateContainer.classList.contains("selected"),
				project: projectContainer.classList.contains("selected") ? projectContainer.querySelector(`p`).textContent : "",
				isFileAttached: fileContainer.classList.contains("selected"),
				note: noteContainer.value,
			}

			allSteps.forEach((step) => {
				const isCompleted = step.querySelector("input").classList.contains("task-done")
				const stepName = step.querySelector("input").value

				_taskPanel.steps.push({ isCompleted: isCompleted, stepName: stepName })
			})

			const cardSelectedIndex = document.querySelector("[card-selected]").dataset.index
			taskList[cardSelectedIndex] = _taskPanel

			updateTaskList()
			taskPanel.remove()
		}
	})
}

function addNewTaskBtn() {
	// IDENTIFICAR SI ES EL BOTÓN DE AÑADIR TAREA O SE ESTÁ ESCRIBIENDO
	const addTaskBtn = document.getElementById("main-section").lastChild
	const isButton = addTaskBtn === document.getElementById("btn-add-task")
	const isInput = addTaskBtn === document.querySelector(".new-task-input-container")
	console.log({ isButton, isInput })

	if (isButton) {
		addTaskBtn.addEventListener("click", (e) => {
			toggleAddTask()
			addNewTaskBtn()
			e.stopPropagation()
		})
	}

	if (isInput) {
		const _container = document.querySelector(".new-task-input-container")
		;["mouseover", "mouseout"].forEach((event) => {
			_container.addEventListener(event, (e) => {
				const isTickIcon = e.target.closest(".fa-square-check") || e.target.closest(".fa-square")
				if (!isTickIcon) return
				toggleClasses(isTickIcon, "fa-square", "fa-square-check")
			})
		})

		const tickIcon = _container.querySelector(".fa-square-check") || _container.querySelector(".fa-square")
		const clockIcon = _container.querySelector(".fa-clock")
		const folderIcon = _container.querySelector(".fa-folder-open")
		const starIcon = _container.querySelector(".fa-star")
		const inputText = _container.querySelector("input")

		_container.addEventListener("click", (e) => {
			if (e.target === tickIcon) toggleClasses(tickIcon, "fa-regular", "fa-square", "fa-solid", "fa-square-check")
			if (e.target === clockIcon) toggleClasses(clockIcon, "selected")
			if (e.target === folderIcon) toggleClasses(folderIcon, "selected")
			if (e.target === starIcon) toggleClasses(starIcon, "selected", "fa-solid")
		})

		document.addEventListener("keydown", (e) => {
			if (e.key !== "Enter") return

			const isCompleted = tickIcon.classList.contains("fa-square-check")
			const hasDueDate = clockIcon.classList.contains("selected")
			const hasProject = folderIcon.classList.contains("selected")
			const isImportant = starIcon.classList.contains("selected")
			const taskText = inputText.value

			const newTask = createTask(taskText)
			newTask.isCompleted = isCompleted
			newTask.isImportant = isImportant
			newTask.dueDate = hasDueDate ? "Hoy" : ""
			newTask.project = hasProject ? "Planificado" : ""

			// TODO

			// Update task list {}

			removeTaskList()
			renderTaskList()
			cardEventListeners()
			// addNewTaskBtn()

			const mainSection = document.getElementById("main-section")
			const newTaskInputContainer = document.querySelector(".new-task-input-container")
			newTaskInputContainer.remove()

			const btnAddTask = createButton("addTask")
			mainSection.appendChild(btnAddTask)
			addNewTaskBtn()

			// --> REVISAR LAS DEPENDENCIAS DE LAS OTRAS FUNCIONES PORQUE SE DUPLICA VALORES
			//
			// Al pulsar enter:
			// - Desaparecer el input
			// - Aparecer el "Añadir tarea"
			// - Actualizar la lista de tareas
		})

		const content = document.getElementById("content")
		content.addEventListener("click", (e) => {
			console.log({ isButton, isInput })

			//TODO -- REVISAR
			const isInputContainer = e.target.closest(".new-task-input-container")
			if (isInputContainer) return

			const newTaskInputContainer = document.querySelector(".new-task-input-container")
			newTaskInputContainer.remove()

			const mainSection = document.getElementById("main-section")
			const btnAddTask = createButton("addTask")
			mainSection.appendChild(btnAddTask)

			// addNewTaskBtn()
		})
	}
}
