import "./styles.css"
import { icon, UI, TaskComponent, setSVGColor, ReturnComponent, TaskForm } from ".//modules/DOM"
// import { allProjects, newProject, NewTask } from "./modules/task.js"
import { TodoList, NewTask } from "./modules/task-refactor"

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
	UI()
	taskAccordion()
	displayTaskFromTodoList()
	taskComponentIconStyles()

	// Event listeners for buttons
	addTaskButton()
}
defaultUI()

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

		// Display task
		const taskContainer = TaskComponent(task.title)
		taskContainer.dataset.id = task.id

		const hasPriority = task.priority
		if (hasPriority) {
			const priorityLabel = taskContainer.querySelector(".label.priority")
			priorityLabel.classList.add("has-priority")

			const priorityText = taskContainer.querySelector(".label-text")
			priorityText.textContent = "Importante"

			setSVGColor(priorityLabel, "#ed726f")
		} else {
			const priorityEl = taskContainer.querySelector(".priority > .label-text")
			priorityEl.textContent = "Sin prioridad"
		}

		const dateProp = task.date
		const dateEl = taskContainer.querySelector(".calendar > .label-text")
		dateEl.textContent = dateProp

		const projectProp = task.project
		const projectEl = taskContainer.querySelector(".folder > .label-text")
		projectEl.textContent = projectProp

		const isCompleted = task.isCompleted
		if (isCompleted) {
			const icon = taskContainer.querySelector(".task-icon")
			icon.src = IconCheckedDefault
		}

		taskList.appendChild(taskContainer)
	})
}

// Behaviour when the task is/isn't completed
import IconCheckedBorderBlue from "./icons/Checked-border-highlighted.svg"
import IconCheckedNotSelected from "./icons/Checked-not-selected.svg"
import IconCheckedDefault from "./icons/Checked-selected.svg"
import IconNotChecked from "./icons/not-checked.svg"

// TODO - ARREGLAR PARA QUE FUNCIONE CON DATASET
function taskComponentIconStyles() {
	const taskIcon = document.querySelectorAll(".task-icon")
	taskIcon.forEach((icon) => {
		const taskContainer = icon.parentElement.parentElement
		const taskText = taskContainer.querySelector(".task-text")

		//Link "isCompleted" with the task from the TodoList
		const taskID = taskContainer.dataset.id
		const taskFromList = TodoList.find((element) => element.id === Number(taskID))

		let isCompleted = taskFromList.isCompleted

		// Styling
		if (isCompleted) {
			icon.src = IconCheckedNotSelected
			taskText.classList.add("transparency-80")
			taskText.classList.add("checked-task")
		}

		// Mouse events
		icon.addEventListener("mouseover", () => {
			if (isCompleted) icon.src = IconCheckedBorderBlue
			if (!isCompleted) icon.src = IconCheckedDefault

			taskText.classList.toggle("transparency-80")
			taskText.classList.toggle("checked-task")
		})

		icon.addEventListener("click", () => {
			if (!isCompleted) {
				icon.src = IconCheckedDefault
				isCompleted = true
			} else {
				icon.src = IconNotChecked
				isCompleted = false
			}

			taskText.classList.toggle("transparency-80")
			taskText.classList.toggle("checked-task")
		})

		icon.addEventListener("mouseout", () => {
			if (isCompleted) icon.src = IconCheckedNotSelected
			if (!isCompleted) icon.src = IconNotChecked

			taskText.classList.toggle("transparency-80")
			taskText.classList.toggle("checked-task")
		})
	})
}

// !TEST //

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
	console.log(taskProperties)

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

// //! OLD <<-------------->> //

// const testingTask = {
// 	// id: 1,
// 	title: "TITLE testing",
// 	priority: "High",
// 	project: "Not defined",
// 	done: false,
// }

// const secondTestingTask = {
// 	id: 2,
// 	title: "SECOND TITLE testing",
// 	priority: "Medium",
// 	project: "Not defined",
// 	done: true,
// }

// // --------------------------------------//

// const DOM = DOMSkeleton()
// const UI = UserInterface()
// const UI_navSection = UI.navSection()

// const firstDefaultProject = Project("All tasks")
// const firstDPTaskList = firstDefaultProject.getTaskList()

// // MAIN SECTION

// for (const task of defaultTasks) {
// 	firstDefaultProject.addTask(task)
// }

// firstDefaultProject.sortTasksByID()
// printTasks(firstDPTaskList)

// const testTask = firstDefaultProject.addTask({
// 	title: "Esta es la sexta tarea default sin ID predeterminado",
// 	priority: "High",
// 	project: "Not asigned",
// 	done: true,
// })

// printTasks(firstDPTaskList)

// const projectTitle = document.getElementById("mainTitle")
// projectTitle.textContent = firstDefaultProject.getProjectName()

// const projectList = document.querySelector(".project-list")
// const defaultProject = UI_navSection.addProject(firstDefaultProject.getProjectName())
// defaultProject.classList.add("selected")
// projectList.appendChild(defaultProject)

// const testProject = Project("Test project")
// const secondDefaultTasks = [
// 	{
// 		id: 1,
// 		title: "TEST Primera tarea",
// 		priority: "High",
// 		project: "Not asigned",
// 		done: true,
// 	},
// 	{
// 		id: 3,
// 		title: "TEST Tercera tarea",
// 		priority: "Low",
// 		project: "Not asigned",
// 		done: false,
// 	},
// 	{
// 		id: 2,
// 		title: "TEST Segunda tarea",
// 		priority: "Medium",
// 		project: "Not asigned",
// 		done: true,
// 	},
// ]
// for (const task of secondDefaultTasks) {
// 	testProject.addTask(task)
// }
// testProject.sortTasksByID()

// addNewTaskBtnEvents()

// let containerID
// function addNewTaskBtnEvents() {
// 	const btnAddNewTask = document.getElementById("btnAddNewTask")
// 	btnAddNewTask.addEventListener("click", () => {
// 		btnAddNewTask.remove()
// 		containerID = undefined

// 		const taskSettings = DOM.taskSettings()
// 		document.getElementById("mainSection")
// 		mainSection.appendChild(taskSettings)
// 		window.scrollBy(0, window.innerHeight)
// 		addEventsToEditSettings()
// 	})
// }

// //TODO ------------- HASTA AQUÍ FUNCIONA ------------ //

// // NAV SECTION
// for (const project in TodoList) {
// 	const navProjectList = document.querySelector(".project-list")

// 	// const projectLabel = AddNavProjectLabel(project)
// 	console.table(TodoList)
// 	console.log(TodoList)
// 	console.log(TodoList[0].name)

// 	const projectLabel = UI.navSection().addProject(project.getProjectName())
// 	navProjectList.appendChild(projectLabel)
// }

// const projectDefault = document.querySelector(".projectContainer")
// projectDefault.classList.add("selected")

// //* FUNCTIONS

// function addEventsToEditSettings() {
// 	// Icono y texto
// 	const icon = document.querySelector("#divSettings > .titleContainer > i")
// 	const input = document.querySelector("#divSettings > .titleContainer > #inputTitleSettings")

// 	icon.onclick = () => {
// 		icon.classList.toggle("fa-square")
// 		icon.classList.toggle("fa-square-check")

// 		const isIconChecked = icon.classList.contains("fa-square-check")

// 		if (isIconChecked) {
// 			icon.id = "taskCompleted"
// 			input.classList.add("textLineThrough")
// 			return
// 		}
// 		if (!isIconChecked) {
// 			icon.removeAttribute("id")
// 			input.classList.remove("textLineThrough")
// 			return
// 		}
// 	}

// 	// Priority labels
// 	const btnPriorityAll = document.querySelectorAll(".priorityLabelsContainer > button")
// 	for (const btnPriority of btnPriorityAll) {
// 		btnPriority.addEventListener("click", () => {
// 			const currentBtnSelected = document.getElementById("btnLabelSelected")
// 			currentBtnSelected.removeAttribute("id")
// 			currentBtnSelected.removeAttribute("class")
// 			currentBtnSelected.classList.add("btnSetting")

// 			btnPriority.id = "btnLabelSelected"
// 			btnPriority.classList.add(`${btnPriority.textContent.toLowerCase()}Priority`)
// 		})
// 	}

// 	// Add task
// 	const btnAddEditedTask = document.querySelector("#divSettings > #btnAddTask")
// 	btnAddEditedTask.addEventListener("click", () => {
// 		// -> Get values from form
// 		const settingsForm = document.getElementById("divSettings")
// 		const icon = settingsForm.querySelector("i")
// 		const isChecked = icon.classList.contains("fa-square-check")
// 		const inputTitle = settingsForm.querySelector("#inputTitleSettings")
// 		const priority = settingsForm.querySelector("#btnLabelSelected")

// 		if (containerID) {
// 			// -> Get task from tasksList and change values in task
// 			const taskFromList = allTasks.getTaskByID(containerID)
// 			taskFromList.done = isChecked
// 			taskFromList.title = inputTitle.value
// 			taskFromList.priority = priority.textContent
// 		}

// 		if (!containerID) {
// 			// Add new task to list
// 			const newTask = {
// 				title: inputTitle.value,
// 				priority: priority.textContent,
// 				project: "Not asigned",
// 				done: isChecked,
// 			}
// 			allTasks.addTask(newTask)

// 			//Print add new task btn
// 			const mainSection = document.getElementById("mainSection")
// 			const btnAddNewTask = DOM.btnAddTask()
// 			btnAddNewTask.id = "btnAddNewTask"
// 			mainSection.appendChild(btnAddNewTask)
// 			addNewTaskBtnEvents()
// 		}

// 		// -> Print task with applied changes
// 		printTasks(taskList)

// 		// -> Close edit task form
// 		settingsForm.remove()
// 	})

// 	// Close settings
// 	const settingsForm = document.querySelector("#divSettings")
// 	const btnClose = document.querySelector("#btnClose")
// 	btnClose.addEventListener("click", () => {
// 		settingsForm.remove()
// 		const mainSection = document.getElementById("mainSection")
// 		const btnAddNewTask = DOM.btnAddTask()
// 		btnAddNewTask.id = "btnAddNewTask"
// 		mainSection.appendChild(btnAddNewTask)
// 		addNewTaskBtnEvents()
// 	})
// }

// function addValuesToEditSettings(taskID) {
// 	const task = allTasks.getTaskByID(taskID)

// 	const input = document.querySelector("#inputTitleSettings")
// 	input.value = task.title

// 	const icon = document.querySelector(".titleContainer > i")
// 	const isTaskCompleted = task.done
// 	if (isTaskCompleted) {
// 		icon.classList.add("fa-square-check")
// 		icon.classList.remove("fa-square")
// 		input.classList.add("textLineThrough")
// 	}

// 	const priorityButtons = document.querySelectorAll(".priorityLabelsContainer > button")
// 	for (const btn of priorityButtons) {
// 		const priorityMatch = btn.textContent === task.priority

// 		if (priorityMatch) {
// 			btn.classList.add(`${btn.textContent.toLowerCase()}Priority`)
// 			btn.id = "btnLabelSelected"
// 		}

// 		if (!priorityMatch) {
// 			btn.classList.remove(`${btn.textContent.toLowerCase()}Priority`)
// 			btn.removeAttribute("id")
// 		}
// 	}
// }

// function printTasks(list) {
// 	const taskContainerAll = document.querySelectorAll(".taskContainer")
// 	for (const taskContainer of taskContainerAll) {
// 		taskContainer.remove()
// 	}

// 	for (const task of list) {
// 		DOM.createTaskContainer(task)
// 	}

// 	taskContainerEvents()
// }

// function taskContainerEvents() {
// 	const taskContainerAll = document.querySelectorAll(".taskContainer")

// 	for (const taskContainer of taskContainerAll) {
// 		taskContainer.addEventListener("mouseenter", () => {
// 			containerID = Number(taskContainer.dataset.index)
// 		})

// 		const taskInfo = taskContainer.querySelector(".taskInfo")
// 		taskInfo.addEventListener("click", () => {
// 			const taskFromList = allTasks.getTaskByID(containerID)
// 			const isTaskCompleted = taskFromList.done

// 			const icon = taskContainer.querySelector("i")
// 			const title = taskContainer.querySelector("p")

// 			icon.classList.toggle("fa-square-check")
// 			icon.classList.toggle("fa-square")
// 			title.classList.toggle("textLineThrough")
// 			taskContainer.classList.toggle("taskCompleted")

// 			taskFromList.done = isTaskCompleted ? false : true
// 		})

// 		const tasksList = document.getElementById("tasksList")
// 		const iconEditTask = taskContainer.querySelector("#btnMoreOptions")

// 		let counter = 0
// 		iconEditTask.addEventListener("click", () => {
// 			//Close any other taskSettings if there's one opened
// 			const divSettings = document.getElementById("divSettings")
// 			if (divSettings) {
// 				divSettings.remove()
// 			}

// 			const currentContainer = document.querySelector(`[data-index="${containerID}"]`)
// 			const containerNextSibling = currentContainer.nextSibling
// 			const newDivSettings = DOM.taskSettings()

// 			tasksList.insertBefore(newDivSettings, containerNextSibling)
// 			addValuesToEditSettings(containerID)
// 			addEventsToEditSettings()

// 			// If it's already open, it close the form
// 			counter++
// 			if (counter === 2) {
// 				newDivSettings.remove()
// 				counter = 0
// 			}
// 		})

// 		const btnDelete = taskContainer.querySelector(".fa-trash-can")
// 		btnDelete.addEventListener("click", () => {
// 			// taskList.splice(containerID - 1, 1) --> NO FUNCIONA
// 			const findTask = taskList.find((task) => task.id === containerID)
// 			const indexOfTask = taskList.indexOf(findTask)
// 			taskList.splice(indexOfTask, 1)

// 			printTasks(taskList)
// 		})
// 	}
// }

// const btnAddNewProject = document.getElementById("btnAddProject")
// btnAddNewProject.addEventListener("click", () => {
// 	// Create new project
// 	const project = newProject()
// 	const setProjectName = prompt("Project title")
// 	project.setName(setProjectName)
// 	const projectName = project.getName()

// 	// PRINT TASK LABEL IN NAV
// 	const projectLabel = AddNavProjectLabel(projectName)
// 	const projectListContainer = document.querySelector(".project-list")

// 	// Add styles to current project label
// 	const currentProjectSelected = document.querySelector(".projectContainer.selected")
// 	currentProjectSelected.classList.remove("selected")
// 	projectLabel.classList.add("selected")

// 	projectListContainer.appendChild(projectLabel)

// 	// PRINT TASKS IN MAIN SECTION
// 	const defaultTasks = [
// 		{
// 			id: 1,
// 			title: "Test Primera tarea",
// 			priority: "High",
// 			project: "Not asigned",
// 			done: true,
// 		},
// 		{
// 			id: 3,
// 			title: "Test Tercera tarea",
// 			priority: "Low",
// 			project: "Not asigned",
// 			done: false,
// 		},
// 		{
// 			id: 2,
// 			title: "Test Segunda tarea",
// 			priority: "Medium",
// 			project: "Not asigned",
// 			done: true,
// 		},
// 	]
// 	for (const task of defaultTasks) {
// 		const defaultTask = NewTask(task)
// 		project.addTask(defaultTask)
// 		project.sortTasksByID()
// 	}

// 	const projectTitle = document.getElementById("mainTitle")
// 	projectTitle.textContent = projectName
// 	printTasks(project.taskList)
// })

// // TODO: Que pueda hacer click en otro título y se recargue el listado en la parte central
// // const projectList = document.querySelectorAll(".projectContainer")
// for (const project of projectList) {
// 	project.addEventListener("click", () => {
// 		// Recuperar el proyecto
// 		const projectTitleFromLabel = project.textContent
// 		const taskList = projects[projectTitleFromLabel]

// 		// Imprimir el título del proyecto
// 		const mainTitle = document.getElementById("mainTitle")
// 		mainTitle.textContent = projectTitleFromLabel

// 		// Imprimir las tareas de ese proyecto
// 		printTasks(taskList)

// 		// Añadir estilo al botón
// 		const currentProjectSelected = document.querySelector(".projectContainer.selected")
// 		currentProjectSelected.classList.remove("selected")
// 		project.classList.add("selected")
// 	})
// }
