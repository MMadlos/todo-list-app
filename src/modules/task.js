import { addDays, format } from "date-fns"

// // El menú de la izquierda mostrará los proyectos que pongamos en projectList
// export const projectList = [
// 	// Default FIX project list
// 	"Planificado",
// 	"Todos",
// 	"Importantes",
// 	"Completados",

// 	// Default CUSTOM project list
// 	"Tutorial",
// 	"Nombre por defecto",
// ]

// STORAGE --> Load
// Check if the taskList has been saved in the storage
let projectList
const isProjectListInStorage = localStorage.getItem("projectList") ? true : false
if (!isProjectListInStorage) {
	projectList = [
		// Default FIX project list
		"Planificado",
		"Todos",
		"Importantes",
		"Completados",

		// Default CUSTOM project list
		"Tutorial",
		"Nombre por defecto",
	]

	localStorage.setItem("projectList", JSON.stringify(projectList))
} else {
	const projectListStorage = localStorage.getItem("projectList")
	projectList = JSON.parse(projectListStorage)
}

export { projectList }

// El main section mostrará las taskList que pongamos aquí en función del proyecto
// export const taskList = []

// Default tasks
const today = new Date()
const todayFormat = format(today, "dd/MM/yyyy")
const tomorrow = addDays(today, 1)
const tomorrowFormat = format(tomorrow, "dd/MM/yyyy")

const firstTask = {
	title: "First Task",
	steps: [],
	isCompleted: false,
	isImportant: false,
	dueDate: todayFormat,
	project: "",
	isFileAttached: false,
	note: "",
}

const secondTaskSteps = [
	{
		isCompleted: true,
		stepName: "Primer paso",
	},
	{
		isCompleted: true,
		stepName: "Segundo paso",
	},
	{
		isCompleted: false,
		stepName: "Tercer paso",
	},
]

const secondTask = {
	title: "Second Task",
	steps: secondTaskSteps,
	isCompleted: true,
	isImportant: true,
	dueDate: todayFormat,
	project: "Tutorial",
	isFileAttached: true,
	note: "Esto es una nota por defecto",
}

const thirdTask = {
	title: "Third Task",
	steps: [],
	isCompleted: false,
	isImportant: true,
	dueDate: tomorrowFormat,
	project: "Nombre por defecto",
	isFileAttached: false,
	note: "",
}

// STORAGE --> Load
// Check if the taskList has been saved in the storage
let taskList
const isTaskListInStorage = localStorage.getItem("taskList") ? true : false
if (!isTaskListInStorage) {
	taskList = []
	taskList.push(firstTask, secondTask, thirdTask)

	localStorage.setItem("taskList", JSON.stringify(taskList))
} else {
	const taskListStorage = localStorage.getItem("taskList")
	taskList = JSON.parse(taskListStorage)
}

export { taskList }

export function createTask(taskTitle) {
	const properties = {
		title: taskTitle,
		steps: [],
		isCompleted: false,
		isImportant: false,
		dueDate: "",
		project: "",
		isFileAttached: false,
		note: "",
	}

	taskList.push(properties)

	return { properties }
}

//

export function getTasksFromProject(projectName) {
	const propertyNames = {
		Planificado: "dueDate",
		Importantes: "isImportant",
		Completados: "isCompleted",
	}
	const propertyToFilter = propertyNames[projectName]

	if (projectName === "Todos") return taskList

	const tasksProject = taskList.filter((task) => {
		if (projectName === "Planificado") return task[propertyToFilter] !== ""
		if (propertyToFilter === undefined) return task.project === projectName

		return task[propertyToFilter]
	})

	return tasksProject
}
