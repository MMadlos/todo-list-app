const TodoList = []

function NewTask({
	title,
	subtasks = [],
	priority = false,
	date = "Sin fecha",
	project = "Sin asignar",
	hasFile = false,
	hasNote = false,
	isCompleted = false,
}) {
	// Para el ID -> Busca el ID más alto de todas las tareas en TodoList y suma 1. Si no hubiese ninguna tarea, significa que es el primero

	// Problema: Si eliminamos la última tarea y volvemos a crear una nueva, se quedará con ese ID.
	let id

	if (TodoList.length === 0) id = 1
	TodoList.forEach((task) => {
		let arrayOfIDs = []

		if (task.id !== undefined) arrayOfIDs.push(task.id)

		const maxNumber = Math.max(...arrayOfIDs)

		id = maxNumber + 1
	})

	TodoList.push({ id, title, subtasks, priority, date, project, hasFile, hasNote, isCompleted })

	return { id, title, subtasks, priority, date, project, hasFile, hasNote, isCompleted }
}

export { TodoList, NewTask }
