// El menú de la izquierda mostrará los proyectos que pongamos en projectList
const projectList = []

// El main section mostrará las taskList que pongamos aquí en función del proyecto
export const taskList = []

export function createTask(taskTitle) {
	const properties = {
		title: taskTitle,
		steps: {},
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

// Default task

const firstTask = {
	title: "",
	steps: {},
	isCompleted: false,
	isImportant: false,
	duedate: "",
	project: "Planificado",
	isFileAttached: false,
	note: "",
}

const secondTask = {
	title: "",
	steps: {},
	isCompleted: false,
	isImportant: false,
	duedate: "",
	project: "Planificado",
	isFileAttached: false,
	note: "",
}

//! OLD CODE ----------
// const allProjects = []

// function newProject(name) {
// 	const taskList = []
// 	let projectName = name
// 	allProjects[projectName] = taskList

// 	const setName = (name) => (projectName = name)
// 	const getName = () => projectName

// 	function addTask(task) {
// 		// Search for the highest ID number of the taskList and apply the next ID number for the new task
// 		let arrayID = []
// 		for (const task of taskList) {
// 			arrayID.push(task.id)
// 		}
// 		const maxID = Math.max(...arrayID)

// 		// Add task to the taskList
// 		task.id = task.id ?? maxID + 1
// 		taskList.push(task)
// 	}

// 	function getTaskByID(ID) {
// 		let taskFromList

// 		for (const task of taskList) {
// 			const hasSameID = ID === task.id
// 			if (hasSameID) taskFromList = task
// 		}

// 		return taskFromList
// 	}

// 	function sortTasksByID() {
// 		taskList.sort((a, b) => {
// 			return a.id - b.id
// 		})
// 	}

// 	return { taskList, addTask, getTaskByID, sortTasksByID, setName, getName }
// }

// function NewTask({ id, title, priority, project, done }) {
// 	return { id, title, priority, project, done }
// }

// export { newProject, NewTask, allProjects }
