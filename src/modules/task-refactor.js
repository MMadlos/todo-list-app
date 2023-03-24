const TodoList = []

export const NewTask = (titleText) => {
	const title = titleText
	const subtasks = []
	const priority = false
	const date = "Sin fecha"
	const project = "Sin asignar"
	const hasFile = false
	const hasNote = false

	return { title, subtasks, priority, date, project, hasFile, hasNote }
}

const Project = (projectName) => {
	const project = {
		name: projectName,
		tasks: [],
	}

	TodoList.push(project)

	// Project related functions
	const setProjectName = (name) => project.name === name
	const getProjectName = () => project.name

	const removeProject = () => {
		const projectToRemove = TodoList.find((element) => element.getProjectName() === project.name)

		const projectIndexToRemove = TodoList.indexOf(projectToRemove)
		TodoList.splice(projectIndexToRemove, 1)
	}

	// Task related functions
	const getTaskList = () => project.tasks

	const addTask = ({ id, title, priority, done }) => {
		const task = { id, title, priority, done, project }
		task.project = project.title

		if (!id) {
			let arrayID = []
			for (const task of project.tasks) {
				arrayID.push(task.id)
			}
			const maxID = Math.max(...arrayID)

			task.id = maxID + 1
		}

		project.tasks.push(task)
	}

	const getTaskBy = (property, value) => {
		return project.tasks.find((element) => element[property] === value)
	}

	const sortTasksByID = () => {
		project.tasks.sort((a, b) => a.id - b.id)
	}

	const deleteTask = (task) => {
		const taskIndexToDelete = project.tasks.indexOf(task)
		project.tasks.splice(taskIndexToDelete, 1)
	}

	return { addTask, getTaskList, getTaskBy, deleteTask, getProjectName, removeProject, sortTasksByID, setProjectName }
}

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

export { TodoList, Project, defaultTasks }
