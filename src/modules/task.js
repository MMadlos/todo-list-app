const allTasks = [
	// Default tasks
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
		id: 4,
		title: "Cuarta tarea",
		priority: "Medium",
		project: "Not asigned",
		done: true,
	},
	{
		id: 2,
		title: "Segunda tarea",
		priority: "Medium",
		project: "Not asigned",
		done: false,
	},
]

// TODO: Debo buscar el siguiente número en la lista.

function getTaskValuesForm() {
	// Title
	const titleInput = document.getElementById("inputTitleSettings")
	const title = titleInput.value

	// Priority
	const priority = document.getElementById("btnLabelSelected").textContent

	// Project
	const project = "Not asigned"

	// Tick
	const tickIcon = document.querySelector("#divSettings > .titleContainer > i")
	let done
	tickIcon.id === "taskCompleted" ? (done = true) : (done = false)

	return { title, priority, project, done }
}

function createTask(title, priority, project, done) {
	const id = allTasks.length + 1
	const info = { id: id, title, priority, project, done }
	const addToList = () => {
		allTasks.push(info)
	}

	return { info, addToList }
}

function addTaskFromForm() {
	const taskValues = getTaskValuesForm()
	const taskValuesArray = Object.values(taskValues)

	createTask(...taskValuesArray).addToList()
}

export { allTasks, createTask, getTaskValuesForm, addTaskFromForm }
