const allTasks = []

const createTask = (title, status = false, note = "", dueDate, priority = "low", checkList, project = "All") => {
	const task = { title, status, note, dueDate, priority, checkList, project }

	const changeParameter = (parameter, newValue) => {
		task[parameter] = newValue
	}

	allTasks.push(task)

	return { title, status, note, dueDate, priority, checkList, project, changeParameter }
}

export { allTasks, createTask }
