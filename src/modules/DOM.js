const content = document.getElementById("content")

const btnAddTask = () => {
	const btnAddTask = document.createElement("button")
	btnAddTask.id = "btnAddTask"
	btnAddTask.classList.add("btnAdd")
	btnAddTask.textContent = "AddTask"

	return btnAddTask
}

const addNewTask = () => {
	const taskTitle = window.prompt("Task title", "Prepare dinner")
	return taskTitle
}

const printNewTask = (title) => {
	const newTask = document.createElement("p")
	newTask.textContent = title

	content.appendChild(newTask)
}

const init = () => {
	content.appendChild(btnAddTask())
}

export { init, btnAddTask, addNewTask, printNewTask }
