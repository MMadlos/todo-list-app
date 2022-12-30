import "./styles.css"
import { DOMSkeleton, addTaskContainer, newTaskSettings, taskStyles } from ".//modules/DOM.js"
import { allTasks, createTask, getTaskValuesForm, addTaskFromForm } from "./modules/task.js"

const init = (() => {
	DOMSkeleton()

	const nuevaTarea = createTask("Quinta tarea", "Medium", "Not asigned", true)
	nuevaTarea.addToList()

	sortTasksByID()
	printTasks()

	console.table(allTasks)

	const taskContainer = document.querySelectorAll(".taskContainer")
	taskContainer.forEach((taskElement) => {
		taskElement.addEventListener("click", () => {
			const taskFromList = getTaskFromList()
			const isTaskCompleted = taskFromList.done
			isTaskCompleted ? (taskFromList.done = false) : (taskFromList.done = true)

			// * Aplicar los estilos correspondientes a "true" o "false"
			taskStyles(taskElement, isTaskCompleted)

			console.log(taskElement)
			console.log(taskFromList)
		})
	})

	openNewTaskSettings()
	setTaskSettings()

	// * Btn add new task
	const btnAddTask = document.getElementById("btnAddTask")
	btnAddTask.addEventListener("click", () => {
		openNewTaskSettings()
		setTaskSettings()
	})
})()

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
		addTaskFromForm()
		printTasks()

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
	const taskList = document.querySelectorAll(".taskContainer")
	for (const task of taskList) {
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
