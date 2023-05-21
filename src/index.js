import "./styles.css"
import { addLabelWithPriority, UI, TaskComponent, SVG, setSVGColor, ReturnComponent, TaskForm, newUI } from ".//modules/DOM"
// import { allProjects, newProject, NewTask } from "./modules/task.js"
import { TodoList, NewTask } from "./modules/task-refactor"
import tickIcon, { Label } from "./modules/icons"

// Default tasks
const DefaultTasks = (() => {
	const defaultTasks = [
		{
			title: "Primera tarea por defecto",
			subtasks: [],
			priority: false,
			date: "Sin fecha",
			project: "Sin asignar",
			hasFile: false,
			hasNote: false,
			isCompleted: false,
		},
		{
			title: "Segunda tarea por defecto",
			subtasks: [],
			priority: true,
			date: "Sin fecha",
			project: "Sin asignar",
			hasFile: false,
			hasNote: false,
			isCompleted: false,
		},
		{
			title: "This is a completed task",
			subtasks: [],
			priority: true,
			date: "Sin fecha",
			project: "Sin asignar",
			hasFile: false,
			hasNote: false,
			isCompleted: true,
		},
	]
	defaultTasks.forEach((task) => {
		NewTask(task)
	})
})()

function defaultUI() {
	newUI()

	// UI()
	// taskAccordion()
	// displayTaskFromTodoList()
	// taskComponentMouseEvents()

	// Event listeners for buttons
	// addTaskButton()

	// //! Test
	// const section = document.getElementById("section")
	// const hasPriorityLabel = Label("hasPriority")
	// const hasNotPriorityLabel = Label("hasNotPriority")

	// section.appendChild(hasPriorityLabel)
	// section.appendChild(hasNotPriorityLabel)

	// section.addEventListener("click", function (e) {
	// 	const btnID = e.target.id

	// 	if (btnID === "") return
	// 	if (btnID === "addTask") addTaskButton()
	// })
}

defaultUI()

//-- Test -- //

function addTaskButton() {
	const addTaskBtn = document.getElementById("addTask")
	addTaskBtn.addEventListener("click", () => {
		const buttonsSection = document.querySelector(".buttons-section")
		const taskListContainer = document.querySelector(".task-list-container")

		buttonsSection.remove()
		taskListContainer.remove()

		displayTaskForm()
		saveButton()
	})
}

function taskAccordion() {
	const taskAccordionContainer = document.querySelector(".task-accordion-container")

	taskAccordionContainer.addEventListener("click", () => {
		const taskListContainer = taskAccordionContainer.parentElement
		const taskContainers = taskListContainer.querySelectorAll(".task-container")

		const accordionIcon = taskAccordionContainer.querySelector(".drop-down")

		taskContainers.forEach((element) => {
			if (element.classList[1] === "hide") {
				element.classList.remove("hide")
				accordionIcon.classList.remove("rotate")
			} else {
				element.classList.add("hide")
				accordionIcon.classList.add("rotate")
			}
		})
	})

	const taskAccordionCounter = taskAccordionContainer.querySelector(".counter-text")
	taskAccordionCounter.textContent = TodoList.length
}

function displayTaskFromTodoList() {
	TodoList.forEach((task) => {
		const taskList = document.querySelector(".task-list-container")

		const status = task.isCompleted ? "completed" : "notCompleted"

		// Display task
		const taskContainer = TaskComponent(task.title, status)
		taskContainer.dataset.id = task.id

		//PASOS
		// 0. Determinar si la tarea está completa
		const isCompleted = task.isCompleted

		//TODO  1. Si la tarea no está completa --> Estilos default

		// 2. Si la tarea está completa --> Añadir estilos
		if (isCompleted) {
			const currentIcon = taskContainer.querySelector(".label-icon")
			const parentEl = currentIcon.parentElement
			const icon = tickIcon("defaultHover")

			currentIcon.remove()
			parentEl.prepend(icon)

			// Texto
			// Etiquetas
			// Botón con chevron right
		}

		// Add styles and text to task components to labels
		const priorityProp = task.priority
		const priorityEl = taskContainer.querySelector(".label-text")
		priorityEl.textContent = task.priority ? "Importante" : "Sin prioridad"

		const dateProp = task.date
		const dateEl = taskContainer.querySelector(".calendar > .label-text")
		dateEl.textContent = dateProp

		const projectProp = task.project
		const projectEl = taskContainer.querySelector(".folder > .label-text")
		projectEl.textContent = projectProp

		taskList.appendChild(taskContainer)
	})
}

// Behaviour when the task is/isn't completed
import IconCheckedBorderBlue from "./icons/Checked-border-highlighted.svg"
import IconCheckedNotSelected from "./icons/Checked-not-selected.svg"
import IconCheckedDefault from "./icons/Checked-selected.svg"
import IconNotChecked from "./icons/not-checked.svg"

// TODO - ARREGLAR PARA QUE FUNCIONE CON DATASET
function taskComponentMouseEvents() {
	const taskContainer = document.querySelectorAll(".task-container")

	taskContainer.forEach((task) => {
		const iconContainer = task.querySelector(".icon-container")
		const svgObject = iconContainer.querySelector("object")
		const taskText = task.querySelector(".task-text")

		//Link "isCompleted" with the task from the TodoList
		const taskID = task.dataset.id
		const taskFromTodoList = TodoList.find((element) => element.id === Number(taskID))

		let isCompleted = taskFromTodoList.isCompleted

		// Display styles
		if (isCompleted) {
			svgObject.data = IconCheckedNotSelected
			taskText.classList.add("checked-task")

			//TODO --> Estilos de labels
		}

		// Mouse events
		svgObject.addEventListener("mouseover", (e) => {
			if (isCompleted) svgObject.data = IconCheckedBorderBlue
			if (!isCompleted) svgObject.data = IconCheckedDefault

			taskText.classList.toggle("transparency-80")
			taskText.classList.toggle("hover")
		})

		svgObject.addEventListener("mouseout", () => {
			if (isCompleted) svgObject.data = IconCheckedNotSelected
			if (!isCompleted) svgObject.data = IconNotChecked

			taskText.classList.toggle("transparency-80")
			taskText.classList.toggle("hover")
		})

		svgObject.addEventListener("load", () => {
			const object = iconContainer.querySelector("object")
			const svg = object.contentDocument.querySelector("svg")

			svg.addEventListener("click", () => {
				if (!isCompleted) {
					svgObject.data = IconCheckedDefault

					isCompleted = true
					taskFromTodoList.isCompleted = true
				} else {
					svgObject.data = IconNotChecked

					isCompleted = false
					taskFromTodoList.isCompleted = false
				}

				taskText.classList.toggle("transparency-80")
				taskText.classList.toggle("checked-task")

				//COMPLETED
				// Al hacer click, debe pasar al estado por defecto
				// 1. Borrar elementos
				const labelContainer = task.querySelector(".labels-container")
				const labels = task.querySelectorAll(".label")
				labels.forEach((label) => label.remove())

				// 2. Añadir elementos con texto de la tarea
				const taskStatus = isCompleted ? "completed" : "notCompleted"

				const priority = taskFromTodoList.priority ? "hasPriority" : "hasNotPriority"

				const priorityLabel = Label(priority, taskStatus)
				console.log(priority)
				console.log(taskStatus)

				labelContainer.appendChild(priorityLabel)
				labelContainer.appendChild(Label("calendar", taskStatus))
				labelContainer.appendChild(Label("folder", taskStatus))

				// console.table(TodoList)
			})
		})
	})
}

// --> FORM PAGE <--
function displayTaskForm() {
	// const content = document.getElementById("content")
	// const section = document.createElement("section")
	// section.id = "section"
	// content.appendChild(section)

	const section = document.getElementById("section")
	const returnComponent = ReturnComponent()
	returnComponent.addEventListener("click", () => {
		section.remove()
		defaultUI()
	})

	section.appendChild(returnComponent)
	section.appendChild(TaskForm())

	saveButton()
}
// displayTaskForm()

function getFormValues() {
	const tickIcon = document.querySelector(`[data-type="isCompleted"]`)
	const isIconChecked = tickIcon.dataset.state === "true" ? true : false

	console.log(tickIcon)
	console.log(isIconChecked)

	// TODO - Añadir lógica al hacer click en cada elemento
	if (isIconChecked === "true") {
		console.log("Añadir lógica")
	}

	const taskTitle = document.getElementById("task-title").value

	const priorityEl = document.querySelector(`[data-type="priority"]`)
	const taskPriority = priorityEl.dataset.state === "true" ? true : false

	const dateEl = document.querySelector(`[data-type="calendar"]`)
	const taskDate = dateEl.dataset.state === "true" ? true : "Sin asignar"

	const projectEl = document.querySelector(`[data-type="folder"]`)
	const taskProject = projectEl.dataset.state === "true" ? true : "Sin asignar"

	// TODO - Añadir lógica para que cada propiedad se traspase a TodoList

	const taskProperties = { taskTitle, isIconChecked, taskPriority, taskDate, taskProject }

	// TODO - Pendiente añadir features subtasks, adjuntar archivo y notas

	return taskProperties
}

function addNewTaskFromFormToList() {
	const taskProperties = getFormValues()

	const newTask = {
		title: taskProperties.taskTitle,
		subtasks: [],
		priority: taskProperties.taskPriority,
		date: taskProperties.taskDate,
		project: taskProperties.taskProject,
		hasFile: false,
		hasNote: false,
		isCompleted: taskProperties.isIconChecked,
	}
	NewTask(newTask)
}

function saveButton() {
	const saveBtn = document.getElementById("saveTask")
	saveBtn.addEventListener("click", () => {
		addNewTaskFromFormToList()

		const section = document.getElementById("section")
		section.remove()
		defaultUI()
		console.table(TodoList)
	})
}
