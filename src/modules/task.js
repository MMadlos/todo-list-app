function newProject() {
	const taskList = []

	function addTask(task) {
		let arrayID = []

		for (const task of taskList) {
			arrayID.push(task.id)
		}

		const maxID = Math.max(...arrayID)

		task.id = task.id ?? maxID + 1

		taskList.push(task)
	}

	function getTaskByID(ID) {
		let taskFromList

		for (const task of taskList) {
			const hasSameID = ID === task.id
			if (hasSameID) taskFromList = task
		}

		return taskFromList
	}

	function sortTasksByID() {
		taskList.sort((a, b) => {
			return a.id - b.id
		})
	}

	return { taskList, addTask, getTaskByID, sortTasksByID }
}

function NewTask({ id, title, priority, project, done }) {
	return { id, title, priority, project, done }
}

const Todos = () => {
	const list = []

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
		addTask(task)
	}

	function addTask({ id, title, priority, project, done }) {
		const task = { id, title, priority, project, done }
		if (id === undefined) {
			id = list.length + 1
		}

		list.push(task)

		return { id, title, priority, project, done }
	}

	function getByID(ID) {
		let taskFromList
		for (const task of list) {
			const hasSameID = ID === task.id
			if (hasSameID) {
				taskFromList = task
			}
		}

		return taskFromList
	}

	function sortByID() {
		list.sort((a, b) => {
			return a.id - b.id
		})
	}

	return { list, addTask, sortByID, getByID }
}

export { Todos, newProject, NewTask }
