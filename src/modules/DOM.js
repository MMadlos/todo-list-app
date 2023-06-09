import { Logo, IconGenerator, createButton } from "./icons"

const content = document.getElementById("content")

function el(element) {
	return document.createElement(element)
}

export function UI() {
	// const menu = menuComponent().display()
	const mainSection = mainSectionComponent()

	content.append(mainSection) //menu,
}

export function menuComponent() {
	// Structure and header
	const menu = el("section")
	const menuContainer = el("div")
	menu.id = "menu"
	menuContainer.className = "menu-container"
	menu.appendChild(menuContainer)

	const appNameContainer = el("div")
	appNameContainer.className = "title-container"
	menuContainer.appendChild(appNameContainer)

	const logo = Logo()
	const appName = el("h1")
	appName.id = "app-name"
	appName.textContent = "Mis tareas"
	appNameContainer.append(logo, appName)

	const btnAddProject = createButton("addProject")
	menu.appendChild(btnAddProject)

	function display() {
		const content = document.getElementById("content")
		return content.prepend(menu)
	}

	//PROJECT LIST
	const projectListDefault = el("div")
	projectListDefault.className = "project-list-container"
	menuContainer.appendChild(projectListDefault)

	function fixedProjectList(projectName, numberOfTasks) {
		const projectItemContainer = el("div")
		const titleContainer = el("div")

		const iconProjectName = {
			planificado: "clock",
			todos: "list",
			importantes: "star",
			completados: "check",
		}

		const iconSelected = iconProjectName[projectName.toLowerCase()]

		const icon = IconGenerator(iconSelected, "size-16")
		const projectTitle = el("p")
		const counterContainer = el("div")
		const counterText = el("p")

		projectItemContainer.className = "project-item-container"
		titleContainer.className = "project-item-title-container"
		projectTitle.textContent = projectName

		counterContainer.className = "project-item-counter-container"
		counterText.textContent = numberOfTasks

		counterContainer.appendChild(counterText)
		titleContainer.append(icon, projectTitle)
		projectItemContainer.append(titleContainer, counterContainer)

		projectListDefault.appendChild(projectItemContainer)
	}

	const projectList = el("div")
	projectList.className = "project-list-container"

	const projectSeparator = el("p")
	projectSeparator.textContent = "Proyectos"
	projectSeparator.className = "project-list-separator"
	projectList.append(projectSeparator)
	menuContainer.append(projectList)

	function customProjects(projectName, numberOfTasks = "0", iconName = "") {
		const projectItemContainer = el("div")
		const titleContainer = el("div")

		const icon = IconGenerator(iconName, "size-16")
		const projectTitle = el("p")
		const counterContainer = el("div")
		const counterText = el("p")

		projectItemContainer.className = "project-item-container"
		titleContainer.className = "project-item-title-container"
		projectTitle.textContent = projectName

		counterContainer.className = "project-item-counter-container"
		counterText.textContent = numberOfTasks

		counterContainer.appendChild(counterText)
		titleContainer.append(icon, projectTitle)
		projectItemContainer.append(titleContainer, counterContainer)

		projectList.append(projectItemContainer)
	}

	return { display, fixedProjectList, customProjects }
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

	function tickIcon(isCompleted = false) {
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

		const btnAddStep = createButton("addStep")
		taskStepsContainer.append(btnAddStep)
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

	const display = () => content.appendChild(taskPanel)

	return { display, taskTitle, tickIcon, isTaskImportant, hasTaskDueDate, project, taskStepsList, file, note }
}

function mainSectionComponent() {
	const mainSection = el("main")
	const mainSectionContainer = el("div")
	mainSection.id = "main-section"
	mainSectionContainer.className = "main-section-container"

	// HEADER
	const headerContainer = el("div")
	const projectIcon = IconGenerator("clock", "size-24")
	const titleContainer = el("div")
	const titleText = el("p")

	headerContainer.className = "header-container"
	titleContainer.className = "title-container"
	titleText.textContent = "Planificado"

	titleContainer.appendChild(titleText)
	headerContainer.append(projectIcon, titleContainer)
	mainSectionContainer.appendChild(headerContainer)

	// TASK LIST (Group + cards)
	const taskListContainer = el("div")
	const taskGroupContainer = el("div")

	taskListContainer.className = "task-list-container"
	taskGroupContainer.className = "task-group-container"

	// -> Group Name elements
	const taskGroupNameContainer = el("div")
	const iconChevronDown = IconGenerator("chevronDown", "size-12")
	const groupName = el("p")
	const groupCounterContainer = el("div")
	const counterText = el("p")

	taskGroupNameContainer.className = "task-group-name-container"
	groupName.textContent = "Hoy"
	groupCounterContainer.className = "group-counter-container"
	counterText.textContent = "2"

	taskGroupNameContainer.append(iconChevronDown, groupName, groupCounterContainer)
	groupCounterContainer.appendChild(counterText)

	// -> Cards
	const taskCardListContainer = el("div")
	taskCardListContainer.className = "task-card-list-container"

	taskListContainer.appendChild(taskGroupContainer)
	taskGroupContainer.append(taskGroupNameContainer, taskCardListContainer)
	mainSectionContainer.append(taskListContainer)

	// BTN
	const btnAddTask = createButton("addTask")
	mainSection.append(mainSectionContainer, btnAddTask)

	return mainSection
}

export function taskCardUI() {
	const taskCardContainer = el("div")
	const taskInfoContainer = el("div")
	const taskTitleContainer = el("div")
	const taskTitle = el("p")
	const taskDetailsContainer = el("div")

	taskCardContainer.className = "task-card-container"
	taskInfoContainer.className = "task-info-container"
	taskTitleContainer.className = "task-title-container"
	taskDetailsContainer.className = "task-details-container"

	taskTitle.textContent = "Título por defecto"

	taskCardContainer.prepend(taskInfoContainer)
	taskInfoContainer.append(taskTitleContainer)
	taskTitleContainer.append(taskTitle, taskDetailsContainer)

	const display = () => {
		const taskListContainer = document.querySelector(".task-card-list-container")
		return taskListContainer.appendChild(taskCardContainer)
	}

	function tickIcon(isTaskCompleted) {
		const tickIcon = isTaskCompleted ? IconGenerator("checkDone", "size-21") : IconGenerator("checkEmpty", "size-21")

		if (isTaskCompleted) taskTitle.classList.add("task-done")

		return taskInfoContainer.prepend(tickIcon)
	}

	function title(title) {
		return (taskTitle.textContent = title)
	}

	function iconImportant(isTaskImportant) {
		const _icon = isTaskImportant ? IconGenerator("starSolid", "size-21") : IconGenerator("star", "size-21")
		return taskCardContainer.appendChild(_icon)
	}

	const { chipInfo, chipsSeparator } = chipInfoFactory(taskDetailsContainer)

	return { display, title, tickIcon, iconImportant, chipInfo, chipsSeparator }
}

function chipInfoFactory(containerToAppend) {
	const chipInfo = (isTrue, type, textContent) => {
		if (!isTrue) return

		let _chip
		if (type === "date") _chip = createDetailsChip("Hoy", textContent)
		if (type === "project") _chip = createDetailsChip("Tutorial", textContent)
		if (type === "file") _chip = createDetailsChip("Attach")

		containerToAppend.appendChild(_chip)
	}

	const chipsSeparator = () => {
		const detailContainers = containerToAppend.querySelectorAll(".detail-container")
		const chipCount = detailContainers.length

		if (chipCount === 0) containerToAppend.remove()
		if (chipCount > 1) {
			for (let i = 0; i < chipCount - 1; i++) {
				detailContainers[i].after(taskDetailsSeparator())
			}
		}
	}

	return { chipInfo, chipsSeparator }
}

function createDetailsChip(chipName, textContent = "Archivo adjunto") {
	const detailContainer = el("div")
	detailContainer.className = "detail-container"

	const _chipName = {
		Hoy: "clock",
		Tutorial: "folder",
		Attach: "clip",
	}
	const iconName = _chipName[chipName]

	const detailIcon = IconGenerator(iconName, "size-16")
	const detailText = el("p")

	detailText.textContent = textContent

	detailContainer.append(detailIcon, detailText)
	return detailContainer
}

function taskDetailsSeparator() {
	const _separator = el("div")
	_separator.className = "task-details-separator"

	return _separator
}

export function toggleAddTask() {
	const mainSection = document.getElementById("main-section")
	const addTaskBtn = document.getElementById("btn-add-task")

	addTaskBtn.remove()
	const newTaskInput = newTaskInputComponent()

	mainSection.appendChild(newTaskInput)
	return
}

function newTaskInputComponent() {
	const newTaskInputContainer = el("div")
	const newTaskTaskContainer = el("div")

	newTaskInputContainer.className = "new-task-input-container"
	newTaskTaskContainer.className = "new-task-task-container"

	const newTaskInputIcon = IconGenerator("checkEmpty", "size-24")
	const newTaskInput = el("input")
	newTaskInput.type = "text"
	newTaskInput.id = "new-task"
	newTaskInput.name = "new-task"
	newTaskInput.placeholder = "Nombre de la tarea"

	const newTaskIconsContainer = el("div")
	newTaskIconsContainer.className = "new-task-icons-container"

	const dueDateIcon = IconGenerator("clock", "size-21")
	const projectFolderIcon = IconGenerator("folder", "size-21")
	const starIcon = IconGenerator("star", "size-21")

	newTaskIconsContainer.append(dueDateIcon, projectFolderIcon, starIcon)
	newTaskTaskContainer.append(newTaskInputIcon, newTaskInput)
	newTaskInputContainer.append(newTaskTaskContainer, newTaskIconsContainer)

	return newTaskInputContainer
}
