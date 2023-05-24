import { Logo, IconGenerator, createButton } from "./icons"

const content = document.getElementById("content")

function el(element) {
	return document.createElement(element)
}

export function newUI() {
	const menu = menuComponent()
	const taskPanel = taskPanelComponent()
	const taskList = mainSectionComponent()

	content.append(menu, taskList, taskPanel)
}

function menuComponent() {
	// Structure and header
	const menu = el("section")
	menu.id = "menu"

	const menuContainer = el("div")
	menuContainer.className = "menu-container"

	const tituloContainer = el("div")
	const logo = Logo()
	const titulo = el("h1")

	tituloContainer.className = "title-container"
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

function taskPanelComponent() {
	const taskPanel = el("section")
	taskPanel.id = "task-panel"
	// taskPanel.className = "hide"

	const btnClosePanel = IconGenerator("close", "size-16")
	btnClosePanel.id = "btn-close-panel"
	taskPanel.appendChild(btnClosePanel)

	const taskPanelContainer = el("div")
	taskPanelContainer.className = "task-panel-container"
	taskPanel.appendChild(taskPanelContainer)

	// TASK AND STEPS
	const taskInfoContainer = el("div")
	taskInfoContainer.id = "task-info-container"
	taskPanelContainer.appendChild(taskInfoContainer)

	// Task
	const taskStepsContainer = el("div")
	taskStepsContainer.className = "task-steps-container"

	const taskTitleContainer = el("div")
	taskTitleContainer.className = "task-panel-title-container"

	const tickIcon = IconGenerator("checkEmpty", "size-24")

	const taskTitle = el("p")
	taskTitle.textContent = "Tarea por defecto"

	taskInfoContainer.appendChild(taskStepsContainer)
	taskStepsContainer.appendChild(taskTitleContainer)
	taskTitleContainer.append(tickIcon, taskTitle)

	// Steps
	function subTaskItem() {
		const subTaskContainer = el("div")
		subTaskContainer.className = "sub-task-container"

		const subTaskText = el("p")
		subTaskText.textContent = "Sub-tarea por defecto"

		const tickIcon = IconGenerator("checkEmpty", "size-16")

		subTaskContainer.append(tickIcon, subTaskText)

		return subTaskContainer
	}

	const btnAddStep = createButton("addStep")

	taskStepsContainer.append(subTaskItem(), subTaskItem(), subTaskItem(), btnAddStep)

	// TASK DETAILS
	const taskDetailsContainer = el("div")
	taskDetailsContainer.id = "task-details-container"
	taskInfoContainer.appendChild(taskDetailsContainer)

	function taskDetailsItem(leftIconName, textContent, rightIconName) {
		const taskDetailsItemContainer = el("div")
		taskDetailsItemContainer.className = "task-details-item-container"

		const taskDetailsInfoContainer = el("div")
		taskDetailsInfoContainer.className = "task-details-info-container"

		const taskDetailsIconLeft = IconGenerator(leftIconName, "size-21")

		const taskDetailsText = el("p")
		taskDetailsText.textContent = textContent

		const taskDetailsIconRigth = IconGenerator(rightIconName, "size-21")

		taskDetailsItemContainer.appendChild(taskDetailsInfoContainer)
		taskDetailsInfoContainer.appendChild(taskDetailsIconLeft)
		taskDetailsInfoContainer.appendChild(taskDetailsText)
		taskDetailsItemContainer.appendChild(taskDetailsIconRigth)

		return taskDetailsItemContainer
	}
	// -> Marcado como importante
	const taskDetailsStarItem = taskDetailsItem("star", "Marcado como importante", "close")
	// -> Vencimiento
	const taskDetailsDueItem = taskDetailsItem("clock", "Vencimiento", "close")

	// -> Proyecto
	const taskDetailsProjectItem = taskDetailsItem("folder", "Proyecto", "chevronRight")

	function separator() {
		const _separator = el("div")
		_separator.className = "separator"
		return _separator
	}

	taskDetailsContainer.appendChild(taskDetailsStarItem)
	taskDetailsContainer.appendChild(separator())
	taskDetailsContainer.appendChild(taskDetailsDueItem)
	taskDetailsContainer.appendChild(separator())
	taskDetailsContainer.appendChild(taskDetailsProjectItem)

	// -> Adjuntar archivo
	const taskDetailsAttachContainer = el("div")
	taskDetailsAttachContainer.id = "task-attach-container"

	const taskDetailsAttachItem = taskDetailsItem("clip", "Adjuntar archivo", "close")

	taskInfoContainer.appendChild(taskDetailsAttachContainer)
	taskDetailsAttachContainer.appendChild(taskDetailsAttachItem)

	// -> Agregar nota
	const taskInputNote = el("textarea")
	taskInputNote.id = "add-note-field"
	taskInputNote.placeholder = "Agregar nota"

	taskInfoContainer.appendChild(taskInputNote)

	// Botones
	const buttonsContainer = el("div")
	buttonsContainer.className = "buttons-container"

	const btnSave = createButton("saveTask")
	const btnDelete = createButton("deleteProject")

	buttonsContainer.append(btnSave, btnDelete)
	taskPanelContainer.appendChild(buttonsContainer)

	return taskPanel
}

function mainSectionComponent() {
	const mainSection = el("main")
	mainSection.id = "main-section"

	// Zona superior
	const mainSectionContainer = el("div")
	mainSectionContainer.className = "main-section-container"

	// -> Título
	const headerContainer = el("div")
	headerContainer.className = "header-container"

	const projectIcon = IconGenerator("clock", "size-24")
	const titleContainer = el("div")
	titleContainer.className = "title-container"

	const titleText = el("p")
	titleText.textContent = "Planificado"

	headerContainer.appendChild(projectIcon)
	headerContainer.appendChild(titleContainer)
	titleContainer.appendChild(titleText)

	mainSectionContainer.appendChild(headerContainer)

	// -> Lista de tareas
	const taskList = taskListComponent()

	// Zona inferior - Añadir nueva tarea
	const btnAddTask = el("button")
	btnAddTask.id = "btn-add-task"
	btnAddTask.className = "btn-regular-blue"

	const btnAddIcon = IconGenerator("add", "size-16")
	const btnText = el("p")
	btnText.textContent = "Añadir tarea"

	btnAddTask.appendChild(btnAddIcon)
	btnAddTask.appendChild(btnText)

	mainSection.appendChild(mainSectionContainer)
	mainSectionContainer.appendChild(taskList)
	mainSection.appendChild(btnAddTask)
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
	// Chevron
	const iconChevronDown = IconGenerator("chevronDown", "size-12")
	// Text
	const groupName = el("p")
	groupName.textContent = "Hoy"

	// Counter
	const groupCounterContainer = el("div")
	groupCounterContainer.className = "group-counter-container"

	const counterText = el("p")
	counterText.textContent = "2"

	taskGroupNameContainer.append(iconChevronDown, groupName, groupCounterContainer)
	groupCounterContainer.appendChild(counterText)

	// ------

	const taskCardListContainer = el("div")
	taskCardListContainer.className = "task-card-list-container"

	const taskCardOne = taskCardUI()
	const taskCardTwo = taskCardUI()

	taskListContainer.appendChild(taskGroupContainer)
	taskGroupContainer.appendChild(taskGroupNameContainer)
	taskGroupContainer.appendChild(taskCardListContainer)
	taskCardListContainer.appendChild(taskCardOne)
	taskCardListContainer.appendChild(taskCardTwo)

	return taskListContainer
}

function taskCardUI() {
	const taskCardContainer = el("div")
	taskCardContainer.className = "task-card-container"

	// Task tick and info
	const taskInfoContainer = el("div")
	taskInfoContainer.className = "task-info-container"

	// -> Tick Icon
	const tickIcon = IconGenerator("checkEmpty", "size-21") //TODO Sustituir

	// -> Task title and info
	const taskTitleContainer = el("div")
	taskTitleContainer.className = "task-title-container"

	// --> Task Title
	const taskTitle = el("p")
	taskTitle.textContent = "Tarea por defecto"

	// --> Task Info
	const taskDetailsContainer = el("div")
	taskDetailsContainer.className = "task-details-container"

	const taskDetailHoy = createDetailsChip("Hoy")
	const taskDetailTutorial = createDetailsChip("Tutorial")
	const taskDetailAttach = createDetailsChip("Attach")

	function createDetailsChip(textContent) {
		const detailContainer = el("div")
		detailContainer.className = "detailContainer"

		// ----> Icono
		let iconName
		if (textContent === "Hoy") iconName = "clock"
		if (textContent === "Tutorial") iconName = "folder"
		if (textContent === "Attach") iconName = "clip"

		const detailIcon = IconGenerator(iconName, "size-16")
		// ----> Texto
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

	taskInfoContainer.append(tickIcon, taskTitleContainer)
	taskTitleContainer.append(taskTitle, taskDetailsContainer)
	taskDetailsContainer.append(taskDetailHoy, taskDetailsSeparator(), taskDetailTutorial, taskDetailsSeparator(), taskDetailAttach)

	// Icon star
	const iconStar = IconGenerator("star", "size-21")

	taskCardContainer.append(taskInfoContainer, iconStar)

	return taskCardContainer
}
