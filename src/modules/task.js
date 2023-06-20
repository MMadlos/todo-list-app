// El menú de la izquierda mostrará los proyectos que pongamos en projectList
export const projectList = [
	// Default FIX project list
	"Planificado",
	"Todos",
	"Importantes",
	"Completados",

	// Default CUSTOM project list
	"Tutorial",
	"Nombre por defecto",
]

// El main section mostrará las taskList que pongamos aquí en función del proyecto
export const taskList = []

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

// Default tasks
const firstTask = {
	title: "First Task",
	steps: [],
	isCompleted: false,
	isImportant: false,
	dueDate: "",
	project: "",
	isFileAttached: false,
	note: "",
}

const secondTask = {
	title: "Second Task",
	steps: [
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
	],
	isCompleted: true,
	isImportant: true,
	dueDate: "Hoy",
	project: "Tutorial",
	isFileAttached: true,
	note: "Esto es una nota por defecto",
}

const thirdTask = {
	title: "Third Task",
	steps: [],
	isCompleted: false,
	isImportant: true,
	dueDate: "Mañana",
	project: "Nombre por defecto",
	isFileAttached: false,
	note: "",
}

taskList.push(firstTask, secondTask, thirdTask)

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
