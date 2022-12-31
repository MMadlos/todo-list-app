import "./styles.css"
import { DOMSkeleton, addTaskContainer, newTaskSettings, taskStyles } from ".//modules/DOM"
import { allTasks, defaultTasks, createTask, getTaskValuesForm, addTaskToList } from "./modules/task.js"

const init = (() => {
	DOMSkeleton()

	for (const task of defaultTasks) {
		addTaskToList(allTasks, task)
	}

	sortTasksByID()
	printTasks()

	toggleTaskCompletion()
	openNewTaskSettings()
	setTaskSettings()

	// * Btn add new task
	const btnAddTask = document.getElementById("btnAddTask")
	btnAddTask.addEventListener("click", () => {
		openNewTaskSettings()
		setTaskSettings()
	})
})()

function toggleTaskCompletion() {
	const taskContainer = document.querySelectorAll(".taskContainer")
	for (const taskElement of taskContainer) {
		taskElement.addEventListener("click", () => {
			const taskFromList = getTaskFromList()
			const isTaskCompleted = taskFromList.done
			isTaskCompleted ? (taskFromList.done = false) : (taskFromList.done = true)

			taskStyles(taskElement, isTaskCompleted)
		})
	}
}

function openNewTaskSettings() {
	const mainSection = document.getElementById("mainSection")
	btnAddTask.style.display = "none"
	mainSection.appendChild(newTaskSettings())
}

function setTaskSettings() {
	//Cuando hago click en el tick, se completa la tarea
	const currentIcon = document.querySelector("#divSettings > .titleContainer > i")
	currentIcon.addEventListener("click", () => {
		currentIcon.classList.toggle("fa-square")
		currentIcon.classList.toggle("fa-square-check")

		currentIcon.classList.contains("fa-square-check") ? (currentIcon.id = "taskCompleted") : currentIcon.removeAttribute("id")
	})

	// Cuando hago click en los botones de prioridad, cambian de colores
	const priorityLabels = document.querySelectorAll(".btnSetting")
	for (const button of priorityLabels) {
		button.addEventListener("click", () => {
			const currentBtnSelected = document.getElementById("btnLabelSelected")

			if (button !== currentBtnSelected) {
				currentBtnSelected.removeAttribute("id")
				currentBtnSelected.classList.remove(`${currentBtnSelected.textContent.toLowerCase()}Priority`)

				button.id = "btnLabelSelected"
				button.classList.add(`${button.textContent.toLowerCase()}Priority`)
			}
		})
	}

	//Botón cerrar ventana
	const btnClose = document.getElementById("btnClose")
	btnClose.addEventListener("click", () => {
		const btnAddTask = document.getElementById("btnAddTask")
		btnAddTask.removeAttribute("style")

		const taskSettingsContainer = document.getElementById("divSettings")
		taskSettingsContainer.remove()
	})

	// Cuando hago click en añadir tarea, se añaden los valores a la tarea
	const btnAddTaskForm = document.querySelector("#divSettings > #btnAddTask")
	btnAddTaskForm.addEventListener("click", () => {
		const values = getTaskValuesForm()
		const newTask = createTask(values)
		addTaskToList(newTask)

		printTasks()
		toggleTaskCompletion()

		console.table(allTasks)
		// Reset values
		const taskSettingsContainer = document.getElementById("divSettings")
		taskSettingsContainer.remove()
		openNewTaskSettings()
		setTaskSettings()
	})
}

function sortTasksByID() {
	allTasks.sort((a, b) => {
		return a.id - b.id
	})
}

function printTasks() {
	const taskListContainer = document.querySelectorAll(".taskContainer")
	for (const task of taskListContainer) {
		task.remove()
	}
	for (const task of allTasks) {
		addTaskContainer(task)
	}
}

function getTaskFromList() {
	const taskContainer = document.querySelector(".taskContainer")
	const taskContainerID = Number(taskContainer.dataset.index)

	let taskFromList

	for (const task of allTasks) {
		const hasSameID = taskContainerID === task.id
		if (hasSameID) {
			taskFromList = task
		}
	}
	return taskFromList
}
