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

	// TASK AND STEPS
	const taskInfoContainer = el("div")
	taskInfoContainer.id = "task-info-container"

	taskPanelContainer.appendChild(taskInfoContainer)

	const taskTitleContainer = el("div")
	taskTitleContainer.className = "task-panel-title-container"

	function checkIcon(isCompleted = false) {
		const _tickIcon = isCompleted ? IconGenerator("checkDone", "size-24") : IconGenerator("checkEmpty", "size-24")

		if (isCompleted) _taskTitle.classList.add("task-done")
		taskTitleContainer.append(_tickIcon)
	}

	const _taskTitle = el("input")
	function taskTitle(title = "Nombre de la tarea") {
		_taskTitle.value = title
		taskTitleContainer.append(_taskTitle)
	}

	const taskStepsContainer = el("div")
	taskStepsContainer.className = "task-steps-container"

	taskStepsContainer.appendChild(taskTitleContainer)
	taskInfoContainer.appendChild(taskStepsContainer)
	const btnAddStep = createButton("addStep")

	function taskStepsList(taskStepsList = []) {
		const stepsList = taskStepsList
		stepsList.forEach((step) => {
			const isStepCompleted = step.isCompleted
			const stepText = step.stepName

			const stepContainer = el("div")
			stepContainer.className = "task-step-container"

			const tickIcon = isStepCompleted ? IconGenerator("checkDone", "size-16") : IconGenerator("checkEmpty", "size-16")

			const stepTextDOM = el("input")
			stepTextDOM.value = stepText
			if (isStepCompleted) stepTextDOM.classList.add("task-done")

			stepContainer.append(tickIcon, stepTextDOM)
			taskStepsContainer.append(stepContainer)
		})

		taskStepsContainer.append(btnAddStep)
	}

	function addNewStep() {
		const stepContainer = document.createElement("div")
		stepContainer.className = "task-step-container"

		const tickIcon = document.createElement("i")
		const stepTextDOM = document.createElement("input")

		tickIcon.classList.add("fa-regular", "fa-square", "size-16")
		stepTextDOM.placeholder = "Nombre del paso"

		stepContainer.append(tickIcon, stepTextDOM)
		taskStepsContainer.insertBefore(stepContainer, btnAddStep)
	}

	const taskDetailsContainer = el("div")
	taskDetailsContainer.id = "task-details-container"
	taskInfoContainer.appendChild(taskDetailsContainer)

	function taskDetailsItem(leftIconName, textContent, rightIconName = "") {
		const taskDetailsItemContainer = el("div")
		const taskDetailsInfoContainer = el("div")
		const taskDetailsText = el("p")

		taskDetailsItemContainer.className = "task-details-item-container"
		taskDetailsInfoContainer.className = "task-details-info-container"

		const taskDetailsIconLeft = IconGenerator(leftIconName, "size-21")
		if (rightIconName !== "") {
			const taskDetailsIconRigth = IconGenerator(rightIconName, "size-21")
			taskDetailsItemContainer.appendChild(taskDetailsIconRigth)
		}

		taskDetailsText.textContent = textContent

		taskDetailsItemContainer.prepend(taskDetailsInfoContainer)
		taskDetailsInfoContainer.append(taskDetailsIconLeft, taskDetailsText)

		return taskDetailsItemContainer
	}

	function isTaskImportant(isImportant) {
		const taskDetailsStarItem = isImportant
			? taskDetailsItem("starSolid", "Marcado como importante", "close")
			: taskDetailsItem("star", "Marcar como importante", "close")

		taskDetailsStarItem.dataset.itemType = "important"

		const _container = taskDetailsStarItem.querySelector(".task-details-info-container")
		if (isImportant) _container.classList.add("selected")
		if (!isImportant) taskDetailsStarItem.querySelector(".fa-xmark").classList.add("hide")

		taskDetailsContainer.append(taskDetailsStarItem, separator())
	}

	function hasTaskDueDate(dueDate) {
		const taskDetailsDueItem = dueDate ? taskDetailsItem("clock", "Vencimiento", "close") : taskDetailsItem("clock", "Añadir vencimiento", "close")

		taskDetailsDueItem.dataset.itemType = "due-date"

		const _container = taskDetailsDueItem.querySelector(".task-details-info-container")
		if (dueDate) _container.classList.add("selected")
		if (!dueDate) taskDetailsDueItem.querySelector(".fa-xmark").classList.add("hide")

		taskDetailsContainer.append(taskDetailsDueItem, separator())
	}

	function project(projectName) {
		const taskDetailsProjectItem = projectName
			? taskDetailsItem("folder", projectName, "chevronDown")
			: taskDetailsItem("folder", "Seleccionar proyecto", "chevronRight")

		taskDetailsProjectItem.dataset.itemType = "project-name"

		const _container = taskDetailsProjectItem.querySelector(".task-details-info-container")
		if (projectName) _container.classList.add("selected")

		taskDetailsContainer.append(taskDetailsProjectItem)
	}

	function separator() {
		const _separator = el("div")
		_separator.className = "separator"
		return _separator
	}

	// -> Adjuntar archivo
	const taskDetailsAttachContainer = el("div")
	taskDetailsAttachContainer.id = "task-attach-container"

	function file(isFileAttached) {
		const taskFileItem = isFileAttached ? taskDetailsItem("clip", "Archivo adjunto", "close") : taskDetailsItem("clip", "Adjuntar archivo", "close")
		taskFileItem.dataset.itemType = "attach-file"
		const _container = taskFileItem.querySelector(".task-details-info-container")
		if (isFileAttached) _container.classList.add("selected")
		if (!isFileAttached) taskFileItem.querySelector(".fa-xmark").classList.add("hide")

		taskDetailsAttachContainer.append(taskFileItem)
	}

	taskInfoContainer.appendChild(taskDetailsAttachContainer)

	// -> Agregar nota
	function note(taskNote) {
		const taskInputNote = el("textarea")
		taskInputNote.id = "add-note-field"
		taskInputNote.placeholder = "Agregar nota"

		if (taskNote) taskInputNote.textContent = taskNote

		taskInfoContainer.appendChild(taskInputNote)
	}

	// Botones
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
