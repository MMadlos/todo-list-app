import LogoTasks from "../icons/tasks.png"
import IconNotChecked from "../icons/not-checked.svg"
import IconChecked from "../icons/Checked-selected.svg"
import IconPriority from "../icons/priority.svg"
import IconCalendar from "../icons/calendar.svg"
import IconFolder from "../icons/folder.svg"
import IconChevronRight from "../icons/chevron-right.svg"
import IconChevronDown from "../icons/chevron-down.svg"
import IconChevronLeft from "../icons/chevron-left.svg"
import IconAttach from "../icons/attach.svg"
import IconAdd from "../icons/add.svg"

const content = document.getElementById("content")

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
	if (type === "chevronLeft") icon.src = IconChevronLeft
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

function label(iconType) {
	const label = document.createElement("div")
	label.className = "label"
	label.classList.add(iconType)

	const text = document.createElement("p")
	text.className = "label-text"

	let svg

	if (iconType === "priority") svg = SVG(IconPriority)
	if (iconType === "calendar") svg = SVG(IconCalendar)
	if (iconType === "folder") svg = SVG(IconFolder)

	label.appendChild(svg)
	label.appendChild(text)

	return label
}

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
