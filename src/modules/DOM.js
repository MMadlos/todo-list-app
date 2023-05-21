import IconNotChecked from "../icons/not-checked.svg"
import IconCheckedDefault from "../icons/Checked-selected.svg"
import IconCheckedBorderBlue from "../icons/Checked-border-highlighted.svg"
import IconCheckedNotSelected from "../icons/Checked-not-selected.svg"
import IconPriority from "../icons/priority.svg"
import IconCalendar from "../icons/calendar.svg"
import IconFolder from "../icons/folder.svg"
import IconChevronRight from "../icons/chevron-right.svg"
import IconChevronDown from "../icons/chevron-down.svg"
import IconChevronLeft from "../icons/chevron-left.svg"
import IconAttach from "../icons/attach.svg"
import IconAdd from "../icons/add.svg"

import tickIcon, { Label, Logo, SVG } from "./icons"

const content = document.getElementById("content")

//!! NEW UI

function el(element) {
	return document.createElement(element)
}

export function newUI() {
	menuComponent()
	mainSectionComponent()
	taskPanelComponent()
}

function menuComponent() {
	const menu = el("section")
	menu.id = "menu"

	const menuContainer = el("div")
	menuContainer.className = "menu-container"

	//CABECERA
	const tituloContainer = el("div")
	tituloContainer.className = "title-container"

	const logo = Logo()

	const titulo = el("h1")
	titulo.textContent = "Mis tareas"
	titulo.id = "app-name"

	tituloContainer.appendChild(logo)
	tituloContainer.appendChild(titulo)

	menuContainer.appendChild(tituloContainer)

	menu.appendChild(menuContainer)

	//PROJECT LIST
	//Default list
	const projectListDefault = el("div")
	projectListDefault.className = "project-list-container"

	const projectItemSelected = projectItem()
	projectItemSelected.classList.add("selected")

	menuContainer.appendChild(projectListDefault)
	projectListDefault.appendChild(projectItemSelected)
	projectListDefault.appendChild(projectItem())
	projectListDefault.appendChild(projectItem())
	projectListDefault.appendChild(projectItem())

	// Personalized list
	const projectList = el("div")
	projectList.className = "project-list-container"

	const projectSeparator = el("p")
	projectSeparator.textContent = "Proyectos"
	projectSeparator.className = "project-list-separator"
	menuContainer.appendChild(projectList)

	projectList.appendChild(projectSeparator)
	projectList.appendChild(projectItem())
	projectList.appendChild(projectItem())

	//BTN ADD PROJECT
	const btnAddProject = el("button")
	btnAddProject.className = "btn-solid-blue"
	btnAddProject.id = "btn-add-project"

	const icon = el("object")
	icon.data = IconAdd
	icon.type = "image/svg+xml"
	icon.className = "add-icon"
	// icon.id = "add-project"

	//TODO - Cambiar a documento icons

	console.log(icon)
	window.addEventListener("load", () => {
		console.log(icon.contentDocument.querySelector("svg"))
		const svg = icon.contentDocument.querySelector("svg")
		svg.id = "add-project"

		svg.setAttribute("width", "16px")

		const path = svg.querySelector("path")
		path.setAttribute("fill", "#FFFFFF")
	})

	const btnText = el("p")
	btnText.textContent = "Nuevo proyecto"

	btnAddProject.appendChild(icon)
	btnAddProject.appendChild(btnText)
	menu.appendChild(btnAddProject)

	return content.appendChild(menu)
}

function projectItem(iconImage) {
	const menuContainer = el("div")
	menuContainer.className = "project-item-container"

	// Logo + titulo
	const titleContainer = el("div")
	titleContainer.className = "project-item-title-container"

	const icon = el("p") //TODO --> Modificar
	icon.textContent = "ICONO"

	const projectTitle = el("p")
	projectTitle.textContent = "Proyecto"

	titleContainer.appendChild(icon)
	titleContainer.appendChild(projectTitle)

	// Contador
	const counterContainer = el("div")
	const counterText = el("p")
	counterText.textContent = "23"
	counterContainer.className = "project-item-counter-container"
	counterContainer.appendChild(counterText)

	menuContainer.appendChild(titleContainer)
	menuContainer.appendChild(counterContainer)

	return menuContainer
}

function taskPanelComponent() {
	const taskPanel = el("section")
	taskPanel.id = "task-panel"
	// taskPanel.className = "hide"

	const btnClosePanel = el("p") //TODO Sustituir
	btnClosePanel.id = "btn-close-panel"
	btnClosePanel.textContent = "Icono cerrar"
	taskPanel.appendChild(btnClosePanel)

	const taskPanelContainer = el("div")
	taskPanelContainer.className = "task-panel-container"
	taskPanel.appendChild(taskPanelContainer)

	// Datos de la tarea
	const taskInfoContainer = el("div")
	taskInfoContainer.id = "task-info-container"
	taskPanelContainer.appendChild(taskInfoContainer)

	// -> Tareas y subtareas
	// Tareas
	const taskStepsContainer = el("div")
	taskStepsContainer.className = "task-steps-container"

	const taskTitleContainer = el("div")
	taskTitleContainer.className = "task-title-container"

	function addIcon(textContent) {
		//TODO Sustituir
		const tickIcon = el("p")
		tickIcon.className = "icon"
		tickIcon.textContent = textContent

		return tickIcon
	}

	const taskTitle = el("p")
	taskTitle.textContent = "Tarea por defecto"

	taskInfoContainer.appendChild(taskStepsContainer)
	taskStepsContainer.appendChild(taskTitleContainer)
	taskTitleContainer.appendChild(addIcon("Tick icon"))
	taskTitleContainer.appendChild(taskTitle)

	// Subtareas
	function subTaskItem() {
		const subTaskContainer = el("div")
		subTaskContainer.className = "sub-task-container"

		const subTaskText = el("p")
		subTaskText.textContent = "Sub-tarea por defecto"

		subTaskContainer.appendChild(addIcon("Tick icon"))
		subTaskContainer.appendChild(subTaskText)

		return subTaskContainer
	}

	taskStepsContainer.appendChild(subTaskItem())
	taskStepsContainer.appendChild(subTaskItem())
	taskStepsContainer.appendChild(subTaskItem())

	// Botón añadir paso
	const addStepContainer = el("button")
	addStepContainer.className = "btn-add-step"
	addStepContainer.id = "btn-add-step"

	const addStepText = el("p")
	addStepText.textContent = "Agregar paso"

	taskStepsContainer.appendChild(addStepContainer)
	addStepContainer.appendChild(addIcon("Add Icon"))
	addStepContainer.appendChild(addStepText)

	// TASK DETAILS
	const taskDetailsContainer = el("div")
	taskDetailsContainer.id = "task-details-container"
	taskInfoContainer.appendChild(taskDetailsContainer)

	function taskDetailsItem(leftIconName, textContent, rightIconName) {
		const taskDetailsItemContainer = el("div")
		taskDetailsItemContainer.className = "task-details-item-container"

		const taskDetailsInfoContainer = el("div")
		taskDetailsInfoContainer.className = "task-details-info-container"

		const taskDetailsIconLeft = addIcon(leftIconName)
		const taskDetailsText = el("p")
		taskDetailsText.textContent = textContent

		const taskDetailsIconRigth = addIcon(rightIconName)

		taskDetailsItemContainer.appendChild(taskDetailsInfoContainer)
		taskDetailsInfoContainer.appendChild(taskDetailsIconLeft)
		taskDetailsInfoContainer.appendChild(taskDetailsText)
		taskDetailsItemContainer.appendChild(taskDetailsIconRigth)

		return taskDetailsItemContainer
	}
	// -> Marcado como importante
	const taskDetailsStarItem = taskDetailsItem("Star Icon", "Marcado como importante", "Close Icon")
	// -> Vencimiento
	const taskDetailsDueItem = taskDetailsItem("Clock Icon", "Vencimiento", "Close Icon")

	// -> Proyecto
	const taskDetailsProjectItem = taskDetailsItem("Folder Icon", "Proyecto", "Chevrolet Icon")

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

	const taskDetailsAttachItem = taskDetailsItem("Clip Icon", "Adjuntar archivo", "Close Icon")

	taskInfoContainer.appendChild(taskDetailsAttachContainer)
	taskDetailsAttachContainer.appendChild(taskDetailsAttachItem)

	// -> Agregar nota
	const taskInputNote = el("textarea")
	taskInputNote.id = "add-note-field"
	taskInputNote.placeholder = "Agregar nota"

	taskInfoContainer.appendChild(taskInputNote)

	// Botones guardar y eliminar
	const buttonsContainer = el("div")
	buttonsContainer.className = "buttons-container"

	// -> Guardar
	const btnSave = el("button")
	btnSave.textContent = "Guardar"
	btnSave.id = "btn-save"
	btnSave.className = "btn-solid-blue"

	// -> Eliminar
	const btnDelete = el("button")
	btnDelete.textContent = "Eliminar"
	btnDelete.id = "btn-delete"

	buttonsContainer.appendChild(btnSave)
	buttonsContainer.appendChild(btnDelete)

	taskPanelContainer.appendChild(buttonsContainer)

	content.appendChild(taskPanel)
}

function mainSectionComponent() {
	const mainSection = el("main")
	mainSection.id = "main-section"
	content.appendChild(mainSection)
}

//! OLD UI ----------->

// Elements for components

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

export function icon(type) {
	const icon = new Image()

	if (type === "logo") icon.src = LogoTasks

	if (type === "notChecked") icon.src = IconNotChecked
	if (type === "checkedDefault") icon.src = IconCheckedDefault
	if (type === "checkedBorderBlue") icon.src = IconCheckedBorderBlue
	if (type === "checkedNotSelected") icon.src = IconCheckedNotSelected

	if (type === "chevronRight") icon.src = IconChevronRight
	if (type === "chevronDown") icon.src = IconChevronDown
	if (type === "chevronLeft") icon.src = IconChevronLeft

	if (type === "attach") icon.src = IconAttach
	if (type === "add") icon.src = IconAdd

	return icon
}

// export function SVG() {
// 	const add = (svgFile) => {
// 		const svgObject = document.createElement("object")
// 		svgObject.data = svgFile
// 		svgObject.type = "image/svg+xml"
// 		svgObject.className = "label-icon"

// 		return svgObject
// 	}
// 	const setColor = (color) => {
// 		window.addEventListener("load", () => {
// 			const objectElement = objectContainer.querySelector("object")
// 			const svg = objectElement.contentDocument.querySelector("svg")
// 			const path = svg.querySelectorAll("path")

// 			path.forEach((element) => {
// 				element.setAttribute("fill", color)
// 			})
// 		})
// 	}

// 	return { add, setColor }
// }

export function setSVGColor(objectContainer, color) {
	window.addEventListener("load", () => {
		const objectElement = objectContainer.querySelector("object")
		const svg = objectElement.contentDocument.querySelector("svg")
		const path = svg.querySelectorAll("path")

		path.forEach((element) => {
			element.setAttribute("fill", color)
		})
	})
}

function label(iconType) {
	const label = document.createElement("div")
	label.className = "label"
	label.classList.add(iconType)

	const text = document.createElement("p")
	text.textContent = "Sin prioridad"
	text.className = "label-text"

	// Icon label
	let svg

	if (iconType === "priority") svg = SVG().add(IconPriority)
	if (iconType === "calendar") svg = SVG().add(IconCalendar)
	if (iconType === "folder") svg = SVG().add(IconFolder)

	label.appendChild(svg)
	label.appendChild(text)

	return label
}

function separatorLine() {
	const separatorLine = document.createElement("div")
	separatorLine.className = "separator-line"

	return separatorLine
}

// Components
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

function buttonsSection() {
	const sectionButtons = document.createElement("div")
	sectionButtons.className = "buttons-section"

	const dropDownContainer = document.createElement("div")
	dropDownContainer.className = "dropDown-container"

	sectionButtons.appendChild(dropDownContainer)
	dropDownContainer.appendChild(Button().dropDown("Mostrar todo"))
	dropDownContainer.appendChild(Button().dropDown("Todos los proyectos"))

	sectionButtons.appendChild(Button().addTask())

	return sectionButtons
}

function taskAccordion() {
	const taskAccordionContainer = document.createElement("div")
	taskAccordionContainer.className = "task-accordion-container"

	const separatorInfoContainer = document.createElement("div")
	separatorInfoContainer.className = "task-accordion-info-container"

	const dropDownIcon = icon("chevronDown")
	dropDownIcon.className = "drop-down"

	const text = document.createElement("p")
	text.textContent = "Sin fecha"
	text.className = "separator-text"

	const counterContainer = document.createElement("div")
	counterContainer.className = "counter-container"

	const counterText = document.createElement("p")
	counterText.textContent = "8" //TODO <<----- CAMBIAR
	counterText.className = "counter-text"

	taskAccordionContainer.appendChild(separatorInfoContainer)
	separatorInfoContainer.appendChild(dropDownIcon)
	separatorInfoContainer.appendChild(text)
	separatorInfoContainer.appendChild(counterContainer)
	counterContainer.appendChild(counterText)
	taskAccordionContainer.appendChild(separatorLine())

	return taskAccordionContainer
}

export function TaskComponent(title, taskStatus) {
	// Template
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

	const iconContainer = document.createElement("div")
	iconContainer.className = "icon-container"
	const taskIcon = tickIcon("default")
	const moreOptionButton = Button().moreDetailsTask()

	taskContainer.appendChild(taskDataContainer)
	taskContainer.appendChild(moreOptionButton)

	taskDataContainer.appendChild(iconContainer)
	iconContainer.appendChild(taskIcon)
	taskDataContainer.appendChild(taskDetailsContainer)
	taskDetailsContainer.appendChild(taskText)
	taskDetailsContainer.appendChild(taskLabelsContainer)

	// Labels
	taskLabelsContainer.appendChild(Label("hasNotPriority", taskStatus))
	taskLabelsContainer.appendChild(Label("calendar", taskStatus))
	taskLabelsContainer.appendChild(Label("folder", taskStatus))

	return taskContainer
}

export function ReturnComponent() {
	const returnComponent = document.createElement("div")
	returnComponent.className = "return-component"

	const returnIcon = SVG(IconChevronLeft)
	returnIcon.className = "return-icon"

	const returnText = document.createElement("p")
	returnText.className = "return-text"
	returnText.textContent = "Volver"

	returnComponent.appendChild(returnIcon)
	returnComponent.appendChild(returnText)

	return returnComponent
}

export function TaskForm() {
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
	tickIcon.dataset.type = "isCompleted"
	tickIcon.dataset.state = "false"

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

		// const iconDetail = svg(type)
		const textDetail = document.createElement("p")

		let svg
		if (type === "priority") {
			svg = SVG(IconPriority, "form-icon")
			textDetail.textContent = "Marcar como prioritario"
		}
		if (type === "calendar") {
			svg = SVG(IconCalendar, "form-icon")
			textDetail.textContent = "Agregar fecha de vencimiento"
		}
		if (type === "folder") {
			svg = SVG(IconFolder, "form-icon")
			textDetail.textContent = "Asignar proyecto"
		}

		svg.dataset.type = type
		svg.dataset.state = "false"

		container.appendChild(svg)
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

	const attachIcon = SVG(IconAttach, "form-icon")

	attachContainer.appendChild(infoAttachContainer)
	infoAttachContainer.appendChild(attachIcon)
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

// Page Layout (Default)
export function UI() {
	const section = document.createElement("section")
	section.id = "section"

	content.appendChild(section)
	section.appendChild(header())
	section.appendChild(buttonsSection())

	const taskListContainer = document.createElement("div")
	taskListContainer.className = "task-list-container"

	section.appendChild(taskListContainer)
	taskListContainer.appendChild(taskAccordion())

	return content
}
