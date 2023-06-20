import { IconGenerator, createButton, iconList } from "../icons"
export const el = (element) => document.createElement(element)

const content = document.getElementById("content")

// LAYOUT
const taskPanel = el("section")
taskPanel.id = "task-panel"

const btnClosePanel = IconGenerator("close", "size-16")
const taskPanelContainer = el("div")

btnClosePanel.id = "btn-close-panel"
taskPanelContainer.className = "task-panel-container"

taskPanel.append(btnClosePanel, taskPanelContainer)

// INSIDE TASK PANEL CONTAINER (TASK PANEL CONTAINER + BUTTONS CONTAINER)

// ALL TASK INFO CONT
// Layout
const taskInfoContainer = el("div")
taskInfoContainer.id = "task-info-container"
taskPanelContainer.appendChild(taskInfoContainer)

// Task title and task steps
const taskStepsContainer = el("div")
taskStepsContainer.className = "task-steps-container"

const taskTitleContainer = el("div")
taskTitleContainer.className = "task-panel-title-container"

const tickIcon = el("i")
const taskTitle = el("input")
const btnAddStep = createButton("addStep")

tickIcon.classList.add("size-24")

taskTitleContainer.append(tickIcon, taskTitle)
taskStepsContainer.append(taskTitleContainer, btnAddStep)
taskInfoContainer.appendChild(taskStepsContainer)

// SECTION - DETAILED INFO (Importance | Due date | Project | Attach | Note)
const taskDetailsContainer = el("div")
taskDetailsContainer.id = "task-details-container"
taskInfoContainer.appendChild(taskDetailsContainer)

// Importance component
const importantContainer = el("div")
const importantContentContainer = el("div")
const importantIcon = el("i")
const importantText = el("p")
const importantCloseIcon = el("i")

importantContainer.dataset.itemType = "important"
importantContainer.className = "task-details-item-container"
importantContentContainer.className = "task-details-info-container"

importantIcon.classList.add("fa-star", "size-21")
importantCloseIcon.classList.add(...iconList.close, "size-21")

importantContainer.append(importantContentContainer, importantCloseIcon)
importantContentContainer.append(importantIcon, importantText)

// DueDate component
const dueDateContainer = el("div")
const dueDateContentContainer = el("div")
const dueDateIcon = el("i")
const dueDateText = el("p")
const dueDateCloseIcon = el("i")

dueDateContainer.dataset.itemType = "due-date"
dueDateContainer.className = "task-details-item-container"
dueDateContentContainer.className = "task-details-info-container"

dueDateIcon.classList.add(...iconList.clock, "size-21")
dueDateCloseIcon.classList.add(...iconList.close, "size-21")

dueDateContainer.append(dueDateContentContainer, dueDateCloseIcon)
dueDateContentContainer.append(dueDateIcon, dueDateText)

// Project component
const projectContainer = el("div")
const projectContentContainer = el("div")
const projectIcon = el("i")
const projectText = el("p")
const projectChevronIcon = el("i")

projectContainer.dataset.itemType = "project-name"
projectContainer.className = "task-details-item-container"
projectContentContainer.className = "task-details-info-container"

projectIcon.classList.add(...iconList.folder, "size-21")
projectChevronIcon.classList.add("fa-solid", "size-21")

projectContainer.append(projectContentContainer, projectChevronIcon)
projectContentContainer.append(projectIcon, projectText)

taskDetailsContainer.append(importantContainer, separator(), dueDateContainer, separator(), projectContainer)

// Attach component
const taskDetailsAttachContainer = el("div")
taskDetailsAttachContainer.id = "task-attach-container"

const attatchContainer = el("div")
const attatchContentContainer = el("div")
const attatchIcon = el("i")
const attatchText = el("p")
const attatchCloseIcon = el("i")

attatchContainer.dataset.itemType = "attach-file"
attatchContainer.className = "task-details-item-container"
attatchContentContainer.className = "task-details-info-container"

attatchIcon.classList.add(...iconList.clip, "size-21")
attatchCloseIcon.classList.add(...iconList.close, "size-21")

attatchContainer.append(attatchContentContainer, attatchCloseIcon)
attatchContentContainer.append(attatchIcon, attatchText)

taskInfoContainer.appendChild(taskDetailsAttachContainer)
taskDetailsAttachContainer.append(attatchContainer)

// Note component
const taskInputNote = el("textarea")
taskInputNote.id = "add-note-field"
taskInputNote.placeholder = "Agregar nota"
taskInfoContainer.appendChild(taskInputNote)

// Buttons
const buttonsContainer = el("div")
const btnSave = createButton("saveTask")
const btnDelete = createButton("deleteProject")

buttonsContainer.className = "buttons-container"

buttonsContainer.append(btnSave, btnDelete)
taskPanelContainer.appendChild(buttonsContainer)

export const taskPanelDOM = {
	display: () => content.appendChild(taskPanel),
	checkIcon: (isCompleted) => isCompletedDOM(taskTitleContainer, isCompleted),
	setTitle: (title) => (taskTitle.value = title),
	taskStepsList: (taskStepsList = []) => {
		taskStepsList.forEach((step) => {
			const { isCompleted, stepName } = step

			const stepContainer = stepUI(isCompleted)
			const stepInput = stepContainer.querySelector("input")
			stepInput.value = stepName

			taskStepsContainer.insertBefore(stepContainer, btnAddStep)
		})
	},
	addNewStep: () => taskStepsContainer.insertBefore(stepUI(), btnAddStep),
	isTaskImportant: (isImportant) => {
		importantText.textContent = isImportant ? "Marcado como importante" : "Marcar como importante"

		importantIcon.classList.toggle("fa-solid", isImportant)
		importantIcon.classList.toggle("is-important", isImportant)
		importantContentContainer.classList.toggle("selected", isImportant)
		importantIcon.classList.toggle("fa-regular", !isImportant)
		importantCloseIcon.classList.toggle("hide", !isImportant)
	},
	hasTaskDueDate: (dueDate) => {
		dueDateText.textContent = dueDate ? "Vence hoy" : "Añadir vencimiento"

		dueDateContentContainer.classList.toggle("selected", dueDate)
		dueDateCloseIcon.classList.toggle("hide", !dueDate)
	},
	project: (projectName) => {
		const hasProjectName = projectName !== "" ? true : false

		projectChevronIcon.classList.toggle("fa-chevron-down", hasProjectName)
		projectChevronIcon.classList.toggle("fa-chevron-right", !hasProjectName)

		projectText.textContent = hasProjectName ? projectName : "Seleccionar proyecto"
		projectContentContainer.classList.toggle("selected", hasProjectName)
	},
	file: (isFileAttached) => {
		attatchText.textContent = isFileAttached ? "Archivo adjunto" : "Adjuntar archivo"

		attatchContentContainer.classList.toggle("selected", isFileAttached)
		attatchCloseIcon.classList.toggle("hide", !isFileAttached)
	},
	note: (taskNote) => (taskInputNote.textContent = taskNote ? taskNote : ""),
}

function stepUI(isStepCompleted = false) {
	const stepContainer = document.createElement("div")
	const checkIcon = el("i")
	const stepInput = document.createElement("input")

	stepContainer.className = "task-step-container"

	taskStepsContainer.append(stepContainer)
	stepContainer.append(checkIcon, stepInput)

	isCompletedDOM(stepContainer, isStepCompleted)

	return stepContainer
}

function separator() {
	const _separator = el("div")
	_separator.className = "separator"
	return _separator
}

function isCompletedDOM(parentElement, isCompleted) {
	const icon = parentElement.querySelector("i")
	const input = parentElement.querySelector("input")

	icon.classList.toggle("fa-solid", isCompleted)
	icon.classList.toggle("fa-square-check", isCompleted)
	icon.classList.toggle("fa-regular", !isCompleted)
	icon.classList.toggle("fa-square", !isCompleted)

	input.classList.toggle("task-done", isCompleted)
}
