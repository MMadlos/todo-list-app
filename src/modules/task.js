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

export { newProject, NewTask }
