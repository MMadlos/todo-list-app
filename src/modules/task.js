const allTasks = []

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

function getTaskValuesForm() {
	const title = document.getElementById("inputTitleSettings").value
	if (title === "") {
		return alert("Please put a name to your task")
	}

	const priority = document.getElementById("btnLabelSelected").textContent
	const project = "Not asigned"
	const done = document.querySelector("#divSettings > .titleContainer > i").id === "taskCompleted"

	return { title, priority, project, done }
}

function createTask({ id, title, priority, project, done }) {
	if (id === undefined) {
		id = allTasks.length + 1
	}

	return { id, title, priority, project, done }
}

function addTaskToList(project, task) {
	project.push(task)
}

export { allTasks, defaultTasks, createTask, getTaskValuesForm, addTaskToList }
