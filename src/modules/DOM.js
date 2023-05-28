import { Logo, IconGenerator, createButton } from "./icons"

const content = document.getElementById("content")

function el(element) {
	return document.createElement(element)
}

export function newUI() {
	const menu = menuComponent()
	const taskList = mainSectionComponent()

	content.append(menu, taskList)
}

function menuComponent() {
	// Structure and header
	const menu = el("section")
	menu.id = "menu"

	const menuContainer = el("div")
	menuContainer.className = "menu-container"

	const tituloContainer = el("div")
	tituloContainer.className = "title-container"

	const logo = Logo()

	const titulo = el("h1")
	titulo.id = "app-name"
	titulo.textContent = "Mis tareas"

	tituloContainer.append(logo, titulo)
	menuContainer.appendChild(tituloContainer)
	menu.appendChild(menuContainer)

	//PROJECT LIST
	//-> Default list
	const projectListDefault = el("div")
	projectListDefault.className = "project-list-container"

	const projectsDefault = {
		planificado: ["clock", "Planificado"],
		todos: ["list", "Todos"],
		importantes: ["star", "Importantes"],
		completados: ["check", "Completados"],
	}

	const projectsLength = Object.keys(projectsDefault).length
	for (var i = 0; i < projectsLength; i++) {
		let projectIconName = Object.values(projectsDefault)[i][0]
		let projectText = Object.values(projectsDefault)[i][1]

		let project = projectItem(projectIconName, projectText)
		if (i === 0) {
			project.classList.add("selected")
		}

		projectListDefault.appendChild(project)
	}

	menuContainer.appendChild(projectListDefault)

	//-> Personalized list
	const projectList = el("div")
	projectList.className = "project-list-container"

	const projectSeparator = el("p")
	projectSeparator.textContent = "Proyectos"
	projectSeparator.className = "project-list-separator"

	const projectTutorial = projectItem("play", "Tutorial")
	const projectDefecto = projectItem("bookmark", "Defecto")

	projectList.append(projectSeparator, projectTutorial, projectDefecto)
	menuContainer.appendChild(projectList)

	const btnAddProject = createButton("addProject")

	menu.appendChild(btnAddProject)

	return menu
}

function projectItem(iconName = "", projectName = "Proyecto") {
	const menuContainer = el("div")
	menuContainer.className = "project-item-container"

	// Icon and title
	const titleContainer = el("div")
	titleContainer.className = "project-item-title-container"

	const icon = IconGenerator(iconName, "size-16")

	const projectTitle = el("p")
	projectTitle.textContent = projectName

	titleContainer.appendChild(icon)
	titleContainer.appendChild(projectTitle)

	// Counter
	const counterContainer = el("div")
	counterContainer.className = "project-item-counter-container"

	const counterText = el("p")
	counterText.textContent = "23"

	counterContainer.appendChild(counterText)
	menuContainer.appendChild(titleContainer)
	menuContainer.appendChild(counterContainer)

	return menuContainer
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

	const taskStepsContainer = el("div")
	taskStepsContainer.className = "task-steps-container"

	const taskTitleContainer = el("div")
	taskTitleContainer.className = "task-panel-title-container"

	const _taskTitle = el("p")

	function tickIcon(completion) {
		const isCompleted = completion
		let _tickIcon

		if (!isCompleted) _tickIcon = IconGenerator("checkEmpty", "size-24")
		if (isCompleted) {
			_tickIcon = IconGenerator("checkDone", "size-24")
			_taskTitle.classList.add("task-done")
		}

		taskTitleContainer.append(_tickIcon)
	}

	function taskTitle(title) {
		_taskTitle.textContent = title
		taskTitleContainer.append(_taskTitle)
	}

	taskInfoContainer.appendChild(taskStepsContainer)
	taskStepsContainer.appendChild(taskTitleContainer)

	// Steps
	function taskStepsList(taskStepsList) {
		const stepsList = taskStepsList
		stepsList.forEach((step) => {
			const isStepCompleted = step.isCompleted
			const stepText = step.stepName

			const stepContainer = el("div")
			stepContainer.className = "task-step-container"

			const tickIcon = isStepCompleted ? IconGenerator("checkDone", "size-16") : IconGenerator("checkEmpty", "size-16")

			const stepTextDOM = el("p")
			stepTextDOM.textContent = stepText
			if (isStepCompleted) stepTextDOM.classList.add("task-done")

			stepContainer.append(tickIcon, stepTextDOM)
			taskStepsContainer.append(stepContainer)
		})

		const btnAddStep = createButton("addStep")
		taskStepsContainer.append(btnAddStep)
	}

	// TASK DETAILS
	const taskDetailsContainer = el("div")
	taskDetailsContainer.id = "task-details-container"
	taskInfoContainer.appendChild(taskDetailsContainer)

	function taskDetailsItem(leftIconName, textContent, rightIconName = "") {
		const taskDetailsItemContainer = el("div")
		const taskDetailsInfoContainer = el("div")

		taskDetailsItemContainer.className = "task-details-item-container"
		taskDetailsInfoContainer.className = "task-details-info-container"

		const taskDetailsIconLeft = IconGenerator(leftIconName, "size-21")
		const taskDetailsText = el("p")
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
			: taskDetailsItem("star", "Marcar como importante", "")

		const _container = taskDetailsStarItem.querySelector(".task-details-info-container")
		if (isImportant) _container.classList.add("selected")

		taskDetailsContainer.append(taskDetailsStarItem, separator())
	}

	function hasTaskDueDate(dueDate) {
		const taskDetailsDueItem = dueDate ? taskDetailsItem("clock", "Vencimiento", "close") : taskDetailsItem("clock", "Añadir vencimiento", "")

		const _container = taskDetailsDueItem.querySelector(".task-details-info-container")
		if (dueDate) _container.classList.add("selected")

		taskDetailsContainer.append(taskDetailsDueItem, separator())
	}

	function project(projectName) {
		const taskDetailsProjectItem = projectName
			? taskDetailsItem("folder", projectName, "chevronDown")
			: taskDetailsItem("folder", "Seleccionar proyecto", "chevronDown")

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
		const taskFileItem = isFileAttached ? taskDetailsItem("clip", "Archivo adjunto", "close") : taskDetailsItem("clip", "Adjuntar archivo", "")

		const _container = taskFileItem.querySelector(".task-details-info-container")
		if (isFileAttached) _container.classList.add("selected")

		taskDetailsAttachContainer.append(taskFileItem)
	}

	taskInfoContainer.appendChild(taskDetailsAttachContainer)

	// -> Agregar nota
	const taskInputNote = el("textarea")
	taskInputNote.id = "add-note-field"
	taskInputNote.placeholder = "Agregar nota"

	function note(taskNote) {
		if (taskNote === "") return
		taskInputNote.textContent = taskNote
	}

	taskInfoContainer.appendChild(taskInputNote)

	// Botones
	const buttonsContainer = el("div")
	buttonsContainer.className = "buttons-container"

	const btnSave = createButton("saveTask")
	const btnDelete = createButton("deleteProject")

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

	const taskList = taskListComponent()
	const btnAddTask = createButton("addTask")

	mainSectionContainer.append(taskList)
	mainSection.append(mainSectionContainer, btnAddTask)

	return mainSection
}

function taskListComponent() {
	const taskListContainer = el("div")
	taskListContainer.className = "task-list-container"

	const taskGroupContainer = el("div")
	taskGroupContainer.className = "task-group-container"

	// -> Group Name elements
	const taskGroupNameContainer = el("div")
	taskGroupNameContainer.className = "task-group-name-container"

	const iconChevronDown = IconGenerator("chevronDown", "size-12")

	const groupName = el("p")
	groupName.textContent = "Hoy"

	const groupCounterContainer = el("div")
	groupCounterContainer.className = "group-counter-container"

	const counterText = el("p")
	counterText.textContent = "2"

	taskGroupNameContainer.append(iconChevronDown, groupName, groupCounterContainer)
	groupCounterContainer.appendChild(counterText)

	// ------

	const taskCardListContainer = el("div")
	taskCardListContainer.className = "task-card-list-container"

	taskListContainer.appendChild(taskGroupContainer)
	taskGroupContainer.append(taskGroupNameContainer, taskCardListContainer)
	// taskCardListContainer.append(taskCardOne, taskCardTwo)

	return taskListContainer
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

	taskCardContainer.prepend(taskInfoContainer)
	taskInfoContainer.append(taskTitleContainer)
	taskTitleContainer.append(taskTitle, taskDetailsContainer)

	function tickIcon(completion) {
		const isCompleted = completion
		let tickIcon

		if (!isCompleted) tickIcon = IconGenerator("checkEmpty", "size-21")
		if (isCompleted) {
			tickIcon = IconGenerator("checkDone", "size-21")
			taskTitle.classList.add("task-done")
		}

		taskInfoContainer.prepend(tickIcon)
		return taskInfoContainer
	}

	function title(title = "Título por defecto") {
		taskTitle.textContent = title
		return taskTitle
	}

	function chipInfo(isTrue, type, textContent) {
		if (!isTrue) return

		let _chip
		if (type === "date") _chip = createDetailsChip("Hoy", textContent)
		if (type === "project") _chip = createDetailsChip("Tutorial", textContent)
		if (type === "file") _chip = createDetailsChip("Attach")

		taskDetailsContainer.appendChild(_chip)
	}

	function iconImportant(isImportant) {
		const _isImportant = isImportant
		const _icon = _isImportant ? IconGenerator("starSolid", "size-21") : IconGenerator("star", "size-21")

		taskCardContainer.appendChild(_icon)
		return taskCardContainer
	}

	function addChipSeparator() {
		const detailContainers = taskDetailsContainer.querySelectorAll(".detailContainer")
		const chipCount = detailContainers.length

		if (chipCount === 0) taskDetailsContainer.remove()
		if (chipCount > 1) {
			for (let i = 0; i < chipCount - 1; i++) {
				detailContainers[i].after(taskDetailsSeparator())
			}
		}
	}

	const display = () => taskCardContainer

	return { display, title, tickIcon, iconImportant, chipInfo, addChipSeparator }
}

function createDetailsChip(chipName, textContent = "Archivo adjunto") {
	const detailContainer = el("div")
	detailContainer.className = "detailContainer"

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
