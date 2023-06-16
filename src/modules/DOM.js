import { IconGenerator, createButton } from "./icons"

const content = document.getElementById("content")

export function el(element) {
	return document.createElement(element)
}

export function taskPanelComponent() {
	const taskPanel = el("section")
	const btnClosePanel = IconGenerator("close", "size-16")
	const taskPanelContainer = el("div")

	taskPanel.id = "task-panel"
	btnClosePanel.id = "btn-close-panel"
	taskPanelContainer.className = "task-panel-container"

	taskPanel.append(btnClosePanel, taskPanelContainer)

	// TASK TITLE AND STEPS
	const taskInfoContainer = el("div")
	const taskStepsContainer = el("div")

	taskInfoContainer.id = "task-info-container"
	taskStepsContainer.className = "task-steps-container"

	taskPanelContainer.appendChild(taskInfoContainer)
	taskInfoContainer.appendChild(taskStepsContainer)

	//Task title
	const taskTitleContainer = el("div")
	taskTitleContainer.className = "task-panel-title-container"

	const tickIcon = IconGenerator("checkEmpty", "size-24")
	const _taskTitle = el("input")

	taskTitleContainer.append(tickIcon, _taskTitle)
	taskStepsContainer.appendChild(taskTitleContainer)

	function checkIcon(isCompleted) {
		if (isCompleted) {
			tickIcon.classList.remove("fa-regular", "fa-square")
			tickIcon.classList.add("fa-solid", "fa-square-check")
			_taskTitle.classList.add("task-done")
		}
	}

	function taskTitle(title = "Nombre de la tarea") {
		_taskTitle.value = title
	}

	//Steps
	function taskStepsList(taskStepsList = []) {
		const stepsList = taskStepsList
		stepsList.forEach((step) => {
			const isStepCompleted = step.isCompleted
			const stepText = step.stepName

			const stepContainer = el("div")
			const tickIcon = isStepCompleted ? IconGenerator("checkDone", "size-16") : IconGenerator("checkEmpty", "size-16")
			const stepTextDOM = el("input")

			stepContainer.className = "task-step-container"
			stepTextDOM.value = stepText
			if (isStepCompleted) stepTextDOM.classList.add("task-done")

			stepContainer.append(tickIcon, stepTextDOM)
			taskStepsContainer.append(stepContainer)
		})

		taskStepsContainer.append(btnAddStep)
	}

	function addNewStep() {
		const stepContainer = document.createElement("div")
		const tickIcon = IconGenerator("checkEmpty", "size-16")
		const stepTextDOM = document.createElement("input")

		stepContainer.className = "task-step-container"

		stepContainer.append(tickIcon, stepTextDOM)
		taskStepsContainer.insertBefore(stepContainer, btnAddStep)

		return stepContainer
	}
	const btnAddStep = createButton("addStep")

	// DETAILED INFO
	const taskDetailsContainer = el("div")
	taskDetailsContainer.id = "task-details-container"
	taskInfoContainer.appendChild(taskDetailsContainer)

	function addDetailItemUI(datasetName) {
		const taskDetailsItemContainer = el("div")
		const taskDetailsInfoContainer = el("div")
		const taskDetailsText = el("p")

		taskDetailsItemContainer.dataset.itemType = datasetName
		taskDetailsItemContainer.className = "task-details-item-container"
		taskDetailsInfoContainer.className = "task-details-info-container"

		const leftIcon = el("i")
		const rightIcon = el("i")

		// Default icons classes
		const star = ["fa-star", "size-21"]
		const clock = ["fa-regular", "fa-clock", "size-21"]
		const clip = ["fa-solid", "fa-paperclip", "size-21"]
		const folder = ["fa-regular", "fa-folder-open", "size-21"]

		const close = ["fa-solid", "fa-xmark", "size-21"]
		const chevronDown = ["fa-solid", "fa-chevron-down", "size-21"]

		const iconDefaultProperties = {
			important: { leftIcon: star, rightIcon: close },
			"due-date": { leftIcon: clock, rightIcon: close },
			"attach-file": { leftIcon: clip, rightIcon: close },
			"project-name": { leftIcon: folder, rightIcon: chevronDown },
		}

		leftIcon.classList.add(...iconDefaultProperties[datasetName].leftIcon)
		rightIcon.classList.add(...iconDefaultProperties[datasetName].rightIcon)

		taskDetailsItemContainer.append(taskDetailsInfoContainer, rightIcon)
		taskDetailsInfoContainer.append(leftIcon, taskDetailsText)

		return taskDetailsItemContainer
	}

	// Importance | Due date | Project | Attach | Note
	const importantItem = addDetailItemUI("important")
	const dueDateItem = addDetailItemUI("due-date")
	const projectItem = addDetailItemUI("project-name")

	taskDetailsContainer.append(importantItem, separator(), dueDateItem, separator(), projectItem)

	const taskDetailsAttachContainer = el("div")
	const attatchItem = addDetailItemUI("attach-file")

	taskDetailsAttachContainer.id = "task-attach-container"

	taskInfoContainer.appendChild(taskDetailsAttachContainer)
	taskDetailsAttachContainer.append(attatchItem)

	const taskInputNote = el("textarea")
	taskInputNote.id = "add-note-field"
	taskInputNote.placeholder = "Agregar nota"
	taskInfoContainer.appendChild(taskInputNote)

	function isTaskImportant(isImportant) {
		const starIcon = importantItem.querySelector(".fa-star")
		const text = importantItem.querySelector("p")
		const closeIcon = importantItem.querySelector(".fa-xmark")
		const itemContainer = starIcon.parentElement

		text.textContent = isImportant ? "Marcado como importante" : "Marcar como importante"

		starIcon.classList.toggle("fa-solid", isImportant)
		starIcon.classList.toggle("is-important", isImportant)
		itemContainer.classList.toggle("selected", isImportant)
		starIcon.classList.toggle("fa-regular", !isImportant)
		closeIcon.classList.toggle("hide", !isImportant)
	}

	function hasTaskDueDate(dueDate) {
		const itemContainer = dueDateItem.querySelector(".task-details-info-container")
		const text = dueDateItem.querySelector("p")
		const closeIcon = dueDateItem.querySelector(".fa-xmark")

		text.textContent = dueDate ? "Vence hoy" : "Añadir vencimiento"

		itemContainer.classList.toggle("selected", dueDate)
		closeIcon.classList.toggle("hide", !dueDate)
	}

	//TODO --> REVISAR: ES POSIBLE QUE NECESITE PASARLE EL NOMBRE DEL PROYECTO AL QUE PERTENECE LA TAREA
	function project(projectName) {
		const itemContainer = projectItem.querySelector(".task-details-info-container")
		const text = projectItem.querySelector("p")
		const chevronIcon = projectItem.querySelector(".task-details-item-container > i")

		text.textContent = projectName ? projectName : "Seleccionar proyecto"
		itemContainer.classList.toggle("selected", projectName)
	}

	function file(isFileAttached) {
		const itemContainer = attatchItem.querySelector(".task-details-info-container")
		const text = attatchItem.querySelector("p")
		const closeIcon = attatchItem.querySelector(".fa-xmark")

		text.textContent = isFileAttached ? "Archivo adjunto" : "Adjuntar archivo"

		itemContainer.classList.toggle("selected", isFileAttached)
		closeIcon.classList.toggle("hide", !isFileAttached)
	}

	const note = (taskNote) => (taskInputNote.textContent = taskNote ? taskNote : "")

	// Buttons
	const buttonsContainer = el("div")
	const btnSave = createButton("saveTask")
	const btnDelete = createButton("deleteProject")

	buttonsContainer.className = "buttons-container"

	buttonsContainer.append(btnSave, btnDelete)
	taskPanelContainer.appendChild(buttonsContainer)

	const display = () => {
		const content = document.getElementById("content")
		content.appendChild(taskPanel)
	}

	return { display, taskTitle, addNewStep, checkIcon, isTaskImportant, hasTaskDueDate, project, taskStepsList, file, note }
}

function separator() {
	const _separator = el("div")
	_separator.className = "separator"
	return _separator
}
