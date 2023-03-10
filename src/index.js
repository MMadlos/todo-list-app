import "./styles.css"
import { DOMSkeleton, navigation, AddNavProjectLabel } from ".//modules/DOM"
import { allProjects, newProject, NewTask } from "./modules/task.js"

const DOM = DOMSkeleton()
const projects = allProjects

// Default projects and tasks
// --> FIRST DEFAULT PROJECT
const allTasks = newProject("All tasks")
const taskList = allTasks.taskList

const defaultTasks = [
	{
		id: 1,
		title: "Primera tarea",
		priority: "High",
		project: "Not asigned",
		done: true,
	},
	{
		id: 3,
		title: "Tercera tarea",
		priority: "Low",
		project: "Not asigned",
		done: false,
	},
	{
		id: 2,
		title: "Segunda tarea",
		priority: "Medium",
		project: "Not asigned",
		done: true,
	},
	{
		id: 5,
		title: "Quinta tarea",
		priority: "Medium",
		project: "Not asigned",
		done: true,
	},
	{
		id: 4,
		title: "Cuarta tarea",
		priority: "Medium",
		project: "Not asigned",
		done: false,
	},
]
for (const task of defaultTasks) {
	const defaultTask = NewTask(task)
	allTasks.addTask(defaultTask)
	allTasks.sortTasksByID()
}
printTasks(taskList)

const testTask = NewTask({
	title: "Esta es la sexta tarea default sin ID predeterminado",
	priority: "High",
	project: "Not asigned",
	done: true,
})
allTasks.addTask(testTask)
printTasks(taskList)

// Crear el main title
const defaultProjectTitle = document.getElementById("mainTitle")
defaultProjectTitle.textContent = allTasks.getName()

// SECOND DEFAULT PROJECT
const testProject = newProject("Test project")
const secondDefaultTasks = [
	{
		id: 1,
		title: "TEST Primera tarea",
		priority: "High",
		project: "Not asigned",
		done: true,
	},
	{
		id: 3,
		title: "TEST Tercera tarea",
		priority: "Low",
		project: "Not asigned",
		done: false,
	},
	{
		id: 2,
		title: "TEST Segunda tarea",
		priority: "Medium",
		project: "Not asigned",
		done: true,
	},
]
for (const task of secondDefaultTasks) {
	const defaultTask = NewTask(task)
	testProject.addTask(defaultTask)
	testProject.sortTasksByID()
}

addNewTaskBtnEvents()

// Añadir los proyectos en el nav
for (const project in projects) {
	const navProjectList = document.getElementById("projectList")

	const projectLabel = AddNavProjectLabel(project)
	navProjectList.appendChild(projectLabel)
}

const projectDefault = document.querySelector(".projectContainer")
projectDefault.classList.add("selected")

let containerID
function addNewTaskBtnEvents() {
	const btnAddNewTask = document.getElementById("btnAddNewTask")
	btnAddNewTask.addEventListener("click", () => {
		btnAddNewTask.remove()
		containerID = undefined

		const taskSettings = DOM.taskSettings()
		document.getElementById("mainSection")
		mainSection.appendChild(taskSettings)
		window.scrollBy(0, window.innerHeight)
		addEventsToEditSettings()
	})
}

//* FUNCTIONS

function addEventsToEditSettings() {
	// Icono y texto
	const icon = document.querySelector("#divSettings > .titleContainer > i")
	const input = document.querySelector("#divSettings > .titleContainer > #inputTitleSettings")

	icon.onclick = () => {
		icon.classList.toggle("fa-square")
		icon.classList.toggle("fa-square-check")

		const isIconChecked = icon.classList.contains("fa-square-check")

		if (isIconChecked) {
			icon.id = "taskCompleted"
			input.classList.add("textLineThrough")
			return
		}
		if (!isIconChecked) {
			icon.removeAttribute("id")
			input.classList.remove("textLineThrough")
			return
		}
	}

	// Priority labels
	const btnPriorityAll = document.querySelectorAll(".priorityLabelsContainer > button")
	for (const btnPriority of btnPriorityAll) {
		btnPriority.addEventListener("click", () => {
			const currentBtnSelected = document.getElementById("btnLabelSelected")
			currentBtnSelected.removeAttribute("id")
			currentBtnSelected.removeAttribute("class")
			currentBtnSelected.classList.add("btnSetting")

			btnPriority.id = "btnLabelSelected"
			btnPriority.classList.add(`${btnPriority.textContent.toLowerCase()}Priority`)
		})
	}

	// Add task
	const btnAddEditedTask = document.querySelector("#divSettings > #btnAddTask")
	btnAddEditedTask.addEventListener("click", () => {
		// -> Get values from form
		const settingsForm = document.getElementById("divSettings")
		const icon = settingsForm.querySelector("i")
		const isChecked = icon.classList.contains("fa-square-check")
		const inputTitle = settingsForm.querySelector("#inputTitleSettings")
		const priority = settingsForm.querySelector("#btnLabelSelected")

		if (containerID) {
			// -> Get task from tasksList and change values in task
			const taskFromList = allTasks.getTaskByID(containerID)
			taskFromList.done = isChecked
			taskFromList.title = inputTitle.value
			taskFromList.priority = priority.textContent
		}

		if (!containerID) {
			// Add new task to list
			const newTask = {
				title: inputTitle.value,
				priority: priority.textContent,
				project: "Not asigned",
				done: isChecked,
			}
			allTasks.addTask(newTask)

			//Print add new task btn
			const mainSection = document.getElementById("mainSection")
			const btnAddNewTask = DOM.btnAddTask()
			btnAddNewTask.id = "btnAddNewTask"
			mainSection.appendChild(btnAddNewTask)
			addNewTaskBtnEvents()
		}

		// -> Print task with applied changes
		printTasks(taskList)

		// -> Close edit task form
		settingsForm.remove()
	})

	// Close settings
	const settingsForm = document.querySelector("#divSettings")
	const btnClose = document.querySelector("#btnClose")
	btnClose.addEventListener("click", () => {
		settingsForm.remove()
		const mainSection = document.getElementById("mainSection")
		const btnAddNewTask = DOM.btnAddTask()
		btnAddNewTask.id = "btnAddNewTask"
		mainSection.appendChild(btnAddNewTask)
		addNewTaskBtnEvents()
	})
}

function addValuesToEditSettings(taskID) {
	const task = allTasks.getTaskByID(taskID)

	const input = document.querySelector("#inputTitleSettings")
	input.value = task.title

	const icon = document.querySelector(".titleContainer > i")
	const isTaskCompleted = task.done
	if (isTaskCompleted) {
		icon.classList.add("fa-square-check")
		icon.classList.remove("fa-square")
		input.classList.add("textLineThrough")
	}

	const priorityButtons = document.querySelectorAll(".priorityLabelsContainer > button")
	for (const btn of priorityButtons) {
		const priorityMatch = btn.textContent === task.priority

		if (priorityMatch) {
			btn.classList.add(`${btn.textContent.toLowerCase()}Priority`)
			btn.id = "btnLabelSelected"
		}

		if (!priorityMatch) {
			btn.classList.remove(`${btn.textContent.toLowerCase()}Priority`)
			btn.removeAttribute("id")
		}
	}
}

function printTasks(list) {
	const taskContainerAll = document.querySelectorAll(".taskContainer")
	for (const taskContainer of taskContainerAll) {
		taskContainer.remove()
	}

	for (const task of list) {
		DOM.createTaskContainer(task)
	}

	taskContainerEvents()
}

function taskContainerEvents() {
	const taskContainerAll = document.querySelectorAll(".taskContainer")

	for (const taskContainer of taskContainerAll) {
		taskContainer.addEventListener("mouseenter", () => {
			containerID = Number(taskContainer.dataset.index)
		})

		const taskInfo = taskContainer.querySelector(".taskInfo")
		taskInfo.addEventListener("click", () => {
			const taskFromList = allTasks.getTaskByID(containerID)
			const isTaskCompleted = taskFromList.done

			const icon = taskContainer.querySelector("i")
			const title = taskContainer.querySelector("p")

			icon.classList.toggle("fa-square-check")
			icon.classList.toggle("fa-square")
			title.classList.toggle("textLineThrough")
			taskContainer.classList.toggle("taskCompleted")

			taskFromList.done = isTaskCompleted ? false : true
		})

		const tasksList = document.getElementById("tasksList")
		const iconEditTask = taskContainer.querySelector("#btnMoreOptions")

		let counter = 0
		iconEditTask.addEventListener("click", () => {
			//Close any other taskSettings if there's one opened
			const divSettings = document.getElementById("divSettings")
			if (divSettings) {
				divSettings.remove()
			}

			const currentContainer = document.querySelector(`[data-index="${containerID}"]`)
			const containerNextSibling = currentContainer.nextSibling
			const newDivSettings = DOM.taskSettings()

			tasksList.insertBefore(newDivSettings, containerNextSibling)
			addValuesToEditSettings(containerID)
			addEventsToEditSettings()

			// If it's already open, it close the form
			counter++
			if (counter === 2) {
				newDivSettings.remove()
				counter = 0
			}
		})

		const btnDelete = taskContainer.querySelector(".fa-trash-can")
		btnDelete.addEventListener("click", () => {
			// taskList.splice(containerID - 1, 1) --> NO FUNCIONA
			const findTask = taskList.find((task) => task.id === containerID)
			const indexOfTask = taskList.indexOf(findTask)
			taskList.splice(indexOfTask, 1)

			printTasks(taskList)
		})
	}
}

const btnAddNewProject = document.getElementById("btnAddProject")
btnAddNewProject.addEventListener("click", () => {
	// Create new project
	const project = newProject()
	const setProjectName = prompt("Project title")
	project.setName(setProjectName)
	const projectName = project.getName()

	// PRINT TASK LABEL IN NAV
	const projectLabel = AddNavProjectLabel(projectName)
	const projectListContainer = document.getElementById("projectList")

	// Add styles to current project label
	const currentProjectSelected = document.querySelector(".projectContainer.selected")
	currentProjectSelected.classList.remove("selected")
	projectLabel.classList.add("selected")

	projectListContainer.appendChild(projectLabel)

	// PRINT TASKS IN MAIN SECTION
	const defaultTasks = [
		{
			id: 1,
			title: "Test Primera tarea",
			priority: "High",
			project: "Not asigned",
			done: true,
		},
		{
			id: 3,
			title: "Test Tercera tarea",
			priority: "Low",
			project: "Not asigned",
			done: false,
		},
		{
			id: 2,
			title: "Test Segunda tarea",
			priority: "Medium",
			project: "Not asigned",
			done: true,
		},
	]
	for (const task of defaultTasks) {
		const defaultTask = NewTask(task)
		project.addTask(defaultTask)
		project.sortTasksByID()
	}

	const projectTitle = document.getElementById("mainTitle")
	projectTitle.textContent = projectName
	printTasks(project.taskList)
})

// TODO: Que pueda hacer click en otro título y se recargue el listado en la parte central
const projectList = document.querySelectorAll(".projectContainer")
for (const project of projectList) {
	project.addEventListener("click", () => {
		// Recuperar el proyecto
		const projectTitleFromLabel = project.textContent
		const taskList = projects[projectTitleFromLabel]

		// Imprimir el título del proyecto
		const mainTitle = document.getElementById("mainTitle")
		mainTitle.textContent = projectTitleFromLabel

		// Imprimir las tareas de ese proyecto
		printTasks(taskList)

		// Añadir estilo al botón
		const currentProjectSelected = document.querySelector(".projectContainer.selected")
		currentProjectSelected.classList.remove("selected")
		project.classList.add("selected")
	})
}
