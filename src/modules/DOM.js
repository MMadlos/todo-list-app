import LogoTasks from "../icons/tasks.png"
import IconNotChecked from "../icons/not-checked.svg"
import IconChecked from "../icons/Checked-selected.svg"
import IconPriority from "../icons/priority.svg"
import IconCalendar from "../icons/calendar.svg"
import IconFolder from "../icons/folder.svg"
import IconChevronRight from "../icons/chevron-right.svg"
import IconChevronDown from "../icons/chevron-down.svg"
import IconAttach from "../icons/attach.svg"
import IconAdd from "../icons/add.svg"

export const content = document.getElementById("content")

export function Button() {
	const btn = document.createElement("button")
	btn.className = "btn"

	function addTask() {
		btn.textContent = "Nueva tarea"
		btn.classList.add("call-to-action")
		btn.id = "addTask"
		return btn
	}

	function saveTask() {
		btn.textContent = "Guardar"
		btn.classList.add("call-to-action")
		btn.id = "saveTask"

		return btn
	}

	function dropDown(text) {
		btn.textContent = text
		btn.classList.add("drop-Down")

		const iconDropDown = icon("chevronDown")

		btn.appendChild(iconDropDown)

		return btn
	}

	function moreDetailsTask() {
		const moreDetailsBtn = document.createElement("div")
		const moreDetailsIcon = icon("chevronRight")

		moreDetailsBtn.className = "more-details-btn-container"
		moreDetailsIcon.classList.add("more-details-btn")

		moreDetailsBtn.appendChild(moreDetailsIcon)

		return moreDetailsBtn
	}

	function deleteTask() {
		btn.textContent = "Eliminar"
		btn.classList.add("delete")
		btn.id = "delete"

		return btn
	}

	return { btn, addTask, saveTask, dropDown, moreDetailsTask, deleteTask }
}

function icon(type) {
	const icon = new Image()

	if (type === "logo") icon.src = LogoTasks

	if (type === "notChecked") icon.src = IconNotChecked
	if (type === "checked") icon.src = IconChecked
	if (type === "priority") icon.src = IconPriority
	if (type === "calendar") icon.src = IconCalendar
	if (type === "folder") icon.src = IconFolder
	if (type === "chevronRight") icon.src = IconChevronRight
	if (type === "chevronDown") icon.src = IconChevronDown
	if (type === "attach") icon.src = IconAttach
	if (type === "add") icon.src = IconAdd

	return icon
}

function SVG(svgFile, className) {
	const svgObject = document.createElement("object")
	svgObject.data = svgFile
	svgObject.type = "image/svg+xml"
	svgObject.className = "label-icon"
	svgObject.classList.add(className)

	return svgObject
}

export function setSVGColor(objectContainer, color) {
	window.addEventListener("load", function () {
		const objectElement = objectContainer.querySelector("object")
		const svg = objectElement.contentDocument.querySelector("svg")
		const path = svg.querySelectorAll("path")

		path.forEach((element) => {
			element.setAttribute("fill", color)
		})
	})
}

function separatorLine() {
	const separatorLine = document.createElement("div")
	separatorLine.className = "separator-line"

	return separatorLine
}

function tasksSeparators() {
	const separatorContainer = document.createElement("div")
	separatorContainer.className = "separator-container"

	const separatorInfoContainer = document.createElement("div")
	separatorInfoContainer.className = "separator-info-container"

	const dropDownIcon = icon("chevronDown")
	dropDownIcon.className = "drop-down"

	const text = document.createElement("p")
	text.textContent = "Sin fecha" //TODO <<----- CAMBIAR
	text.className = "separator-text"

	const counterContainer = document.createElement("div")
	counterContainer.className = "counter-container"

	const counterText = document.createElement("p")
	counterText.textContent = "8" //TODO <<----- CAMBIAR
	counterText.className = "counter-text"

	separatorContainer.appendChild(separatorInfoContainer)
	separatorInfoContainer.appendChild(dropDownIcon)
	separatorInfoContainer.appendChild(text)
	separatorInfoContainer.appendChild(counterContainer)
	counterContainer.appendChild(counterText)
	separatorContainer.appendChild(separatorLine())

	return separatorContainer
}

function label(iconType) {
	const label = document.createElement("div")
	label.className = "label"

	const text = document.createElement("p")
	text.className = "label-text"
	text.classList.add("default")

	const labelIcon = icon(iconType)
	labelIcon.classList.add("label-icon")

	if (iconType === "priority") {
		const svg = SVG(IconPriority)
		text.textContent = "Sin prioridad"
		label.appendChild(svg)
	}
	if (iconType === "calendar") text.textContent = "Mar 31, 2023"
	if (iconType === "folder") text.textContent = "Sin asignar"

	label.appendChild(labelIcon)
	label.appendChild(text)

	return label
}

export function TaskComponent(title) {
	const taskContainer = document.createElement("div")
	taskContainer.className = "task-container"

	const taskDataContainer = document.createElement("div")
	taskDataContainer.className = "task-data-container"

	const taskDetailsContainer = document.createElement("div")
	taskDetailsContainer.className = "task-details-container"

	const taskText = document.createElement("p")
	taskText.textContent = title
	taskText.className = "task-text"

	const taskLabelsContainer = document.createElement("div")
	taskLabelsContainer.className = "labels-container"

	const taskIcon = icon("notChecked")
	taskIcon.className = "task-icon"

	const moreOptionButton = Button().moreDetailsTask()

	taskContainer.appendChild(taskDataContainer)
	taskContainer.appendChild(moreOptionButton)

	taskDataContainer.appendChild(taskIcon)
	taskDataContainer.appendChild(taskDetailsContainer)
	taskDetailsContainer.appendChild(taskText)
	taskDetailsContainer.appendChild(taskLabelsContainer)

	taskLabelsContainer.appendChild(label("priority"))
	taskLabelsContainer.appendChild(label("calendar"))
	taskLabelsContainer.appendChild(label("folder"))

	return taskContainer
}

function header() {
	const headerContainer = document.createElement("div")
	headerContainer.className = "header-container"

	const header = document.createElement("h1")
	header.textContent = "Mis tareas"
	header.className = "header"

	const logo = icon("logo")
	logo.className = "logo"

	headerContainer.appendChild(logo)
	headerContainer.appendChild(header)

	return headerContainer
}

function TaskForm() {
	const taskFormContainer = document.createElement("div")
	taskFormContainer.className = "task-form-container"

	// TASK DETAILS SECTION
	const infoContainer = document.createElement("div")
	infoContainer.className = "info-container"

	// -> Title and subtasks component
	const titleTaskComponent = document.createElement("div")
	titleTaskComponent.className = "title-task-component"

	// --> Title
	const titleContainer = document.createElement("div")
	titleContainer.className = "title-container"

	const tickIcon = icon("notChecked")

	const taskTitleLabel = document.createElement("label")
	taskTitleLabel.htmlFor = "task-title"

	const taskTitle = document.createElement("input")
	taskTitle.value = "Título añadido"
	taskTitle.type = "text"
	taskTitle.id = "task-title"
	taskTitle.placeholder = "Escribe el título de la tarea"

	// --> Subtasks
	const subtasksContainer = document.createElement("div")
	subtasksContainer.className = "subtasks-container"

	const subtaskContent = document.createElement("div")
	subtaskContent.className = "subtask-content"

	const subtaskIcon = icon("add")
	const subtaskText = document.createElement("p")
	subtaskText.textContent = "Agregar paso"

	titleTaskComponent.appendChild(titleContainer)
	titleContainer.appendChild(tickIcon)
	titleContainer.appendChild(taskTitleLabel)
	titleContainer.appendChild(taskTitle)

	titleTaskComponent.appendChild(subtasksContainer)
	subtasksContainer.appendChild(subtaskContent)
	subtaskContent.appendChild(subtaskIcon)
	subtaskContent.appendChild(subtaskText)

	infoContainer.appendChild(titleTaskComponent)
	infoContainer.appendChild(separatorLine())

	// -> Task info details component
	const taskInfoDetailsContainer = document.createElement("div")
	taskInfoDetailsContainer.className = "task-info-details-container"

	function infoDetailsComponent(type) {
		const container = document.createElement("div")
		container.className = "info-detail-component-container"

		const iconDetail = icon(type)
		const textDetail = document.createElement("p")

		if (type === "priority") textDetail.textContent = "Marcar como prioritario"
		if (type === "calendar") textDetail.textContent = "Agregar fecha de vencimiento"
		if (type === "folder") textDetail.textContent = "Asignar proyecto"

		container.appendChild(iconDetail)
		container.appendChild(textDetail)

		return container
	}

	taskInfoDetailsContainer.appendChild(infoDetailsComponent("priority"))
	taskInfoDetailsContainer.appendChild(separatorLine())
	taskInfoDetailsContainer.appendChild(infoDetailsComponent("calendar"))
	taskInfoDetailsContainer.appendChild(separatorLine())
	taskInfoDetailsContainer.appendChild(infoDetailsComponent("folder"))

	infoContainer.appendChild(taskInfoDetailsContainer)

	// -> Attach file component
	const attachContainer = document.createElement("div")
	attachContainer.className = "task-info-details-container"

	const infoAttachContainer = document.createElement("div")
	infoAttachContainer.className = "info-detail-component-container"

	const attachText = document.createElement("p")
	attachText.textContent = "Adjuntar archivo"

	attachContainer.appendChild(infoAttachContainer)

	infoAttachContainer.appendChild(icon("attach"))
	infoAttachContainer.appendChild(attachText)

	infoContainer.appendChild(attachContainer)

	// -> Add note section
	const addNote = document.createElement("textarea")
	addNote.name = "add-note"
	addNote.rows = "5"
	addNote.id = "addNote"
	addNote.placeholder = "Agregar nota"

	infoContainer.appendChild(addNote)

	// BUTTONS SECTION
	const buttonsContainer = document.createElement("div")
	buttonsContainer.className = "buttons-container"

	const saveButton = Button().saveTask()
	const deleteButton = Button().deleteTask()

	taskFormContainer.appendChild(infoContainer)

	taskFormContainer.appendChild(buttonsContainer)
	buttonsContainer.appendChild(saveButton)
	buttonsContainer.appendChild(deleteButton)

	return taskFormContainer
}

export function UI() {
	const section = document.createElement("section")
	section.id = "section"

	content.appendChild(section)
	section.appendChild(header())

	const sectionButtons = document.createElement("div")
	sectionButtons.className = "buttons-section"

	const dropDownContainer = document.createElement("div")
	dropDownContainer.className = "dropDown-container"

	section.appendChild(sectionButtons)
	sectionButtons.appendChild(dropDownContainer)

	dropDownContainer.appendChild(Button().dropDown("Mostrar todo"))
	dropDownContainer.appendChild(Button().dropDown("Todos los proyectos"))
	sectionButtons.appendChild(Button().addTask())

	const taskListContainer = document.createElement("div")
	taskListContainer.className = "task-list-container"

	section.appendChild(taskListContainer)
	taskListContainer.appendChild(tasksSeparators())
	// taskListContainer.appendChild(TaskComponent())

	// section.appendChild(TaskForm()) //TODO <<----- TASKFORM

	return content
}

//! OLD <<-------->> //

export function UserInterface() {
	function navSection() {
		const nav = document.createElement("nav")
		nav.classList.add("nav-container")

		const navTitle = document.createElement("p")
		navTitle.classList.add("nav-title")
		navTitle.textContent = "PROJECTS"
		nav.appendChild(navTitle)

		const separator = document.createElement("div")
		separator.classList.add("nav-separator")
		nav.appendChild(separator)

		const projectListContainer = document.createElement("div")
		projectListContainer.classList.add("project-list")
		nav.appendChild(projectListContainer)

		const btnAddProject = document.createElement("button")
		btnAddProject.textContent = "+ Add project"
		btnAddProject.id = "btnAddProject"
		nav.appendChild(btnAddProject)

		function addProject(title) {
			const projectLabel = document.createElement("div")
			const projectTitle = document.createElement("p")

			projectLabel.classList.add("projectContainer")
			projectTitle.classList.add("projectTitle")

			projectTitle.textContent = title

			projectLabel.appendChild(projectTitle)
			return projectLabel
		}

		return { nav, addProject }
	}

	function mainSection() {}

	return { navSection, mainSection }
}

const DOMSkeleton = () => {
	const DOM = UserInterface()
	content.appendChild(DOM.navSection().nav)

	const mainSection = document.createElement("main")
	mainSection.id = "mainSection"

	const title = document.createElement("h1")
	title.id = "mainTitle"

	const taskList = document.createElement("div")
	taskList.id = "tasksList"

	const btnAddNewTask = btnAddTask()
	btnAddNewTask.id = "btnAddNewTask"

	const btn = document.createElement("button")
	btn.className = "btn"
	btn.textContent = "Hola"

	content.appendChild(mainSection)
	mainSection.appendChild(btn)

	mainSection.appendChild(title)
	mainSection.appendChild(taskList)
	mainSection.appendChild(btnAddNewTask)

	function createTaskContainer({ id, title, priority, project, done }) {
		const taskContainer = document.createElement("div")
		taskContainer.setAttribute("data-index", id)
		taskContainer.classList.add("taskContainer")
		taskList.appendChild(taskContainer)

		const taskInfoContainer = document.createElement("div")
		taskInfoContainer.classList.add("taskInfo")
		taskContainer.appendChild(taskInfoContainer)

		const icon = document.createElement("i")
		icon.classList.add("fa-regular")
		taskInfoContainer.appendChild(icon)

		const taskTitle = document.createElement("p")
		taskTitle.textContent = title
		taskInfoContainer.appendChild(taskTitle)

		if (done) {
			taskContainer.classList.add("taskCompleted")
			icon.classList.add("fa-square-check")
			taskTitle.classList.add("textLineThrough")
		}

		if (!done) {
			icon.classList.add("fa-square")
		}

		// Priority label
		const labelPriority = document.createElement("div")
		labelPriority.classList.add("label", `${priority.toLowerCase()}Priority`)
		taskInfoContainer.appendChild(labelPriority)

		const textPriorityLabel = document.createElement("p")
		textPriorityLabel.textContent = priority
		labelPriority.appendChild(textPriorityLabel)

		// Project label
		const labelProject = document.createElement("div")
		labelProject.classList.add("label", "disabled")
		taskInfoContainer.appendChild(labelProject)

		const textProjectLabel = document.createElement("p")
		textProjectLabel.textContent = project
		labelProject.appendChild(textProjectLabel)

		const taskDetails = document.createElement("div")
		taskDetails.classList.add("taskDetails")
		taskContainer.appendChild(taskDetails)

		// More details info
		const datePicker = document.createElement("div")
		datePicker.textContent = "Aquí va selector fecha"
		datePicker.id = "datePicker"
		taskDetails.appendChild(datePicker)

		const iconMore = document.createElement("i")
		iconMore.classList.add("fa-solid", "fa-ellipsis-vertical")
		iconMore.id = "btnMoreOptions"
		taskDetails.appendChild(iconMore)

		const btnDelete = document.createElement("i")
		btnDelete.classList.add("fa-regular", "fa-trash-can")
		taskDetails.appendChild(btnDelete)

		return taskContainer
	}

	function taskSettings() {
		const settingsContainer = document.createElement("div")
		settingsContainer.id = "divSettings"
		settingsContainer.classList.add("taskSettingsContainer")

		// Title
		const titleContainer = document.createElement("div")
		titleContainer.classList.add("titleContainer")

		const icon = document.createElement("i")
		icon.classList.add("fa-regular", "fa-square")

		const inputTitle = document.createElement("input")
		inputTitle.classList.add("inputTitle")
		inputTitle.placeholder = "Ej: poner lavadora"
		inputTitle.id = "inputTitleSettings"

		settingsContainer.appendChild(titleContainer)
		titleContainer.appendChild(icon)
		titleContainer.appendChild(inputTitle)

		// Labels
		const labelsContainer = document.createElement("div")
		labelsContainer.classList.add("labelsContainer")

		const priorityLabelsContainer = document.createElement("div")
		priorityLabelsContainer.classList.add("priorityLabelsContainer")

		const priority = document.createElement("p")
		priority.textContent = "Prioridad"

		const btnLow = document.createElement("button")
		btnLow.classList.add("btnSetting", "lowPriority")
		btnLow.id = "btnLabelSelected"
		btnLow.textContent = "Low"

		const btnMedium = document.createElement("button")
		btnMedium.classList.add("btnSetting")
		btnMedium.textContent = "Medium"

		const btnHigh = document.createElement("button")
		btnHigh.classList.add("btnSetting")
		btnHigh.textContent = "High"

		const projectLabelsContainer = document.createElement("div")
		projectLabelsContainer.classList.add("projectLabelsContainer")

		const project = document.createElement("p")
		project.textContent = "Proyecto"

		const divProjectLabel = document.createElement("div")
		divProjectLabel.classList.add("projectLabel")

		const textProjectLabel = document.createElement("p")
		textProjectLabel.textContent = "No disponible"

		settingsContainer.appendChild(labelsContainer)

		labelsContainer.appendChild(priorityLabelsContainer)
		priorityLabelsContainer.appendChild(priority)
		priorityLabelsContainer.appendChild(btnLow)
		priorityLabelsContainer.appendChild(btnMedium)
		priorityLabelsContainer.appendChild(btnHigh)

		labelsContainer.appendChild(projectLabelsContainer)
		projectLabelsContainer.appendChild(project)
		projectLabelsContainer.appendChild(divProjectLabel)
		divProjectLabel.appendChild(textProjectLabel)

		// Buttons
		const btnAddNewTask = btnAddTask()
		const btnCloseSettings = btnClose()

		settingsContainer.appendChild(btnAddNewTask)
		settingsContainer.appendChild(btnCloseSettings)

		return settingsContainer
	}

	function btnAddTask() {
		const btnAddTask = document.createElement("button")
		btnAddTask.textContent = "Añadir tarea"
		btnAddTask.id = "btnAddTask"
		btnAddTask.classList.add("btnBig", "btnAccent")
		return btnAddTask
	}

	function btnClose() {
		const btnClose = document.createElement("button")
		btnClose.textContent = "Cerrar"
		btnClose.id = "btnClose"
		btnClose.classList.add("btnBig")
		btnClose.classList.add("btnUnderlined")
		return btnClose
	}

	return { content, createTaskContainer, taskSettings, btnAddTask, btnClose }
}

function taskSettings() {
	const settingsContainer = document.createElement("div")
	settingsContainer.id = "divSettings"
	settingsContainer.classList.add("taskSettingsContainer")

	const titleContainer = document.createElement("div")
	titleContainer.classList.add("titleContainer")

	const icon = document.createElement("i")
	icon.classList.add("fa-regular", "fa-square")

	const inputTitle = document.createElement("input")
	inputTitle.classList.add("inputTitle")
	inputTitle.placeholder = "Ej: poner lavadora"
	inputTitle.id = "inputTitleSettings"

	settingsContainer.appendChild(titleContainer)
	titleContainer.appendChild(icon)
	titleContainer.appendChild(inputTitle)

	// Labels
	const labelsContainer = document.createElement("div")
	labelsContainer.classList.add("labelsContainer")

	const priorityLabelsContainer = document.createElement("div")
	priorityLabelsContainer.classList.add("priorityLabelsContainer")

	const priority = document.createElement("p")
	priority.textContent = "Prioridad"

	const btnLow = document.createElement("button")
	btnLow.classList.add("btnSetting", "lowPriority")
	btnLow.id = "btnLabelSelected"
	btnLow.textContent = "Low"

	const btnMedium = document.createElement("button")
	btnMedium.classList.add("btnSetting")
	btnMedium.textContent = "Medium"

	const btnHigh = document.createElement("button")
	btnHigh.classList.add("btnSetting")
	btnHigh.textContent = "High"

	const projectLabelsContainer = document.createElement("div")
	projectLabelsContainer.classList.add("projectLabelsContainer")

	const project = document.createElement("p")
	project.textContent = "Proyecto"

	const divProjectLabel = document.createElement("div")
	divProjectLabel.classList.add("projectLabel")

	const textProjectLabel = document.createElement("p")
	textProjectLabel.textContent = "No disponible"

	settingsContainer.appendChild(labelsContainer)

	labelsContainer.appendChild(priorityLabelsContainer)
	priorityLabelsContainer.appendChild(priority)
	priorityLabelsContainer.appendChild(btnLow)
	priorityLabelsContainer.appendChild(btnMedium)
	priorityLabelsContainer.appendChild(btnHigh)

	labelsContainer.appendChild(projectLabelsContainer)
	projectLabelsContainer.appendChild(project)
	projectLabelsContainer.appendChild(divProjectLabel)
	divProjectLabel.appendChild(textProjectLabel)

	// Buttons
	const btnAddNewTask = btnAddTask()
	const btnCloseSettings = btnClose()

	settingsContainer.appendChild(btnAddNewTask)
	settingsContainer.appendChild(btnCloseSettings)

	return settingsContainer
}

//! Extraído
function NavSection() {
	const nav = document.createElement("nav")
	nav.classList.add("nav-container")

	const navTitle = document.createElement("p")
	navTitle.classList.add("nav-title")
	navTitle.textContent = "PROJECTS"

	const separator = document.createElement("div")
	separator.classList.add("nav-separator")

	const projectListContainer = document.createElement("div")
	projectListContainer.classList.add("project-list")

	// ADD Project btn
	const btnAddProject = document.createElement("button")
	btnAddProject.textContent = "+ Add project"
	btnAddProject.id = "btnAddProject"

	nav.appendChild(navTitle)
	nav.appendChild(separator)
	nav.appendChild(projectListContainer)
	nav.appendChild(btnAddProject)

	return nav
}

//! Extraído
function AddNavProjectLabel(title) {
	const projectLabel = document.createElement("div")
	const projectTitle = document.createElement("p")

	projectLabel.classList.add("projectContainer")
	projectTitle.classList.add("projectTitle")

	projectTitle.textContent = title

	projectLabel.appendChild(projectTitle)
	return projectLabel
}

export { DOMSkeleton, NavSection, AddNavProjectLabel }
