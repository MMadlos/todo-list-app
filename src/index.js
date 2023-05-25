import "./styles.css"
import { newUI, taskCardUI, createDetailsChip } from ".//modules/DOM"
import { createTask, taskList } from "./modules/task.js"

newUI()

const firstTask = createTask("First Task")
firstTask.properties.isCompleted = true
firstTask.properties.isImportant = true
firstTask.properties.dueDate = "Mañana"
firstTask.properties.project = "Ejemplo"
firstTask.properties.isFileAttached = true

const secondTask = createTask("First Task")

// Display all tasks in taskList
const cardListContainer = document.querySelector(".task-card-list-container")
taskList.forEach((task) => {
	const taskCard = taskCardUI()
	const taskCardDOM = taskCard.display()

	const taskTitle = task.title
	const isCompleted = task.isCompleted
	const isImportant = task.isImportant
	const hasDueDate = task.dueDate !== ""
	const hasProject = task.project !== ""
	const hasFileAttached = task.isFileAttached

	taskCard.title(taskTitle)
	taskCard.tickIcon(isCompleted)
	taskCard.iconImportant(isImportant)

	taskCard.chipInfo(hasDueDate, "date")
	taskCard.chipInfo(hasProject, "project")
	taskCard.chipInfo(hasFileAttached, "file")

	cardListContainer.append(taskCardDOM)
})
