import "./styles.css"
import { UI, taskCardUI, taskPanelComponent, toggleAddTask } from ".//modules/DOM"
import { taskList, createTask } from "./modules/task.js"
import { createButton } from "./modules/icons"

initApp()

function initApp() {
	UI()
	renderTaskList()
	cardEventListeners()
	addTaskBtnEventListeners()
}

function renderTaskList() {
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
		taskCard.chipsSeparator()

		const taskIndex = taskList.indexOf(task)
		taskCardDOM.dataset.index = taskIndex
	})
}

function updateTaskList() {
	removeTaskList()
	renderTaskList()
	cardEventListeners()
	addTaskBtnEventListeners()
}

function cardEventListeners() {
	const allCards = document.querySelectorAll(".task-card-container")
	for (const card of allCards) {
		checkIconEventListeners(card)
		card.addEventListener("click", (e) => {
			const cardIndex = card.dataset.index
			const taskFromList = taskList[cardIndex]

			const isCardSelected = card.hasAttribute("card-selected")

			const clickedElement = e.target
			const tickIcon = card.querySelector(".task-info-container > i")
			const isTickIcon = clickedElement == tickIcon
			const isStarIcon = e.target.closest(".fa-star")

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
				const taskText = tickIcon.nextElementSibling.querySelector("p")
				taskText.classList.toggle("task-done")
				taskFromList.isCompleted = !taskFromList.isCompleted
			}

			if (isStarIcon) {
				toggleClasses(isStarIcon, "fa-solid", "fa-regular", "is-important")
				taskFromList.isImportant = !taskFromList.isImportant
				return
			}
		})
	}
}

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

function taskPanelEventListeners() {
	const taskPanel = document.getElementById("task-panel")

	checkIconEventListeners(taskPanel)

	taskPanel.addEventListener("click", (e) => {
		const isBtnClose = e.target.closest("#btn-close-panel")
		const isTickIcon = e.target.closest("i.fa-square") || e.target.closest("i.fa-square-check")
		const taskDetailsContainer = e.target.closest(".task-details-item-container")
		const isBtnSave = e.target.closest("#btn-save")
		const addStepBtn = e.target.closest("#btn-add-step")

		if (addStepBtn) {
			// Add Input above add step btn

			const taskStepsContainer = document.querySelector(".task-steps-container")
			const stepContainer = document.createElement("div")
			stepContainer.className = "task-step-container"

			const tickIcon = document.createElement("i")
			tickIcon.classList.add("fa-regular", "fa-square", "size-16")

			const stepTextDOM = document.createElement("input")
			stepTextDOM.value = "Nuevo paso añadido"

			stepContainer.append(tickIcon, stepTextDOM)

			taskStepsContainer.insertBefore(stepContainer, addStepBtn)
		}

		if (isBtnClose) {
			taskPanel.remove()
			const selectedCard = document.querySelector("[card-selected]")
			selectedCard.removeAttribute("card-selected")
		}

		if (isTickIcon) {
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
				dueDate: dueDateContainer.classList.contains("selected") ? "Hoy" : "",
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

function addTaskBtnEventListeners() {
	const addTaskElement = document.getElementById("main-section").lastChild
	const isButton = addTaskElement === document.getElementById("btn-add-task")

	if (isButton) {
		addTaskElement.addEventListener("click", (e) => {
			toggleAddTask()
			addTaskBtnEventListeners()
			e.stopPropagation()
		})
		return
	}

	checkIconEventListeners(addTaskElement)
	const tickIcon = addTaskElement.querySelector(".fa-square-check") ?? addTaskElement.querySelector(".fa-square")

	const clockIcon = addTaskElement.querySelector(".fa-clock")
	const folderIcon = addTaskElement.querySelector(".fa-folder-open")
	const starIcon = addTaskElement.querySelector(".fa-star")
	const inputText = addTaskElement.querySelector("input")

	addTaskElement.addEventListener("click", (e) => {
		if (e.target === clockIcon) toggleClasses(clockIcon, "selected")
		if (e.target === folderIcon) toggleClasses(folderIcon, "selected")
		if (e.target === starIcon) toggleClasses(starIcon, "selected", "fa-solid")
		e.stopPropagation()
	})

	addTaskElement.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return

		const isCompleted = tickIcon.classList.contains("fa-square-check")
		const hasDueDate = clockIcon.classList.contains("selected")
		const hasProject = folderIcon.classList.contains("selected")
		const isImportant = starIcon.classList.contains("selected")
		const taskText = inputText.value

		const newTask = createTask(taskText)
		newTask.properties.isCompleted = isCompleted
		newTask.properties.isImportant = isImportant
		newTask.properties.dueDate = hasDueDate ? "Hoy" : ""
		newTask.properties.project = hasProject ? "Planificado" : ""

		const mainSection = document.getElementById("main-section")
		const newTaskInputContainer = document.querySelector(".new-task-input-container")
		newTaskInputContainer.remove()

		const btnAddTask = createButton("addTask")
		mainSection.appendChild(btnAddTask)

		const isAnyCardSelected = document.querySelector("[card-selected]") ?? false
		if (!isAnyCardSelected) return updateTaskList()

		const cardSelected = document.querySelector("[card-selected]")
		const cardSelectedIndex = cardSelected.dataset.index

		updateTaskList()
		const newSelectedCard = document.querySelector(`[data-index="${cardSelectedIndex}"]`)
		newSelectedCard.setAttribute("card-selected", "")
	})

	const content = document.getElementById("content")
	content.addEventListener("click", () => {
		if (isButton) return

		const mainSection = document.getElementById("main-section")
		mainSection.lastChild.remove()

		const btnAddTask = createButton("addTask")
		mainSection.appendChild(btnAddTask)

		addTaskBtnEventListeners()
	})
}

// UTILITIES
function toggleClasses(element, ...classes) {
	const _element = element
	const _classes = [...classes]

	for (let _class of _classes) {
		_element.classList.toggle(_class)
	}
}

function checkIconEventListeners(parentElement) {
	const checkIcon = parentElement.querySelector(".fa-square-check") ?? parentElement.querySelector(".fa-square")
	;["mouseover", "mouseout"].forEach((event) => {
		checkIcon.addEventListener(event, () => {
			toggleClasses(checkIcon, "fa-square", "fa-square-check")
		})
	})

	checkIcon.addEventListener("click", (e) => {
		toggleClasses(checkIcon, "fa-solid", "fa-regular", "fa-square-check", "fa-square")
	})
}

function removeTaskList() {
	document.querySelectorAll(".task-card-container").forEach((card) => {
		card.remove()
	})
}

function updateTaskPanel() {
	const taskPanel = document.getElementById("task-panel")
	taskPanel.remove()

	openTaskPanel()
}
