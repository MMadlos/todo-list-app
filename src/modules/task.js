export const Todos = () => {
	const list = []

	function addDefaultTasks() {
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

	function addTask({ id, title, priority, project, done }) {
		if (id === undefined) {
			id = list.length + 1
		}

		const task = { id, title, priority, project, done }

		if (project === "Not asigned") {
			list.push(task)
		}

		return { id, title, priority, project, done }
	}

	function sortByID() {
		list.sort((a, b) => {
			return a.id - b.id
		})
	}

	return { list, addDefaultTasks, addTask, sortByID, getByID }
}
