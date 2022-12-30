import "./styles.css"
import { DOMSkeleton, addTaskContainer, openNewTaskSettings, taskStyles } from ".//modules/DOM.js"
import { allTasks } from "./modules/task.js"

const init = (() => {
	DOMSkeleton()

	// * Filter tasks by property "done" -> false | true
	const tasksNotCompleted = []
	const tasksCompleted = []

	allTasks.forEach((task) => {
		const taskValues = Object.values(task)
		taskValues.includes(false) ? tasksNotCompleted.push(task) : tasksCompleted.push(task)
	})

	// * Sort not completed tasks by its ID
	tasksNotCompleted.sort((a, b) => {
		return a.id - b.id
	})

	// * Add at the begining of the list the not completed tasks ordered by its ID
	tasksNotCompleted.forEach((task) => {
		const taskProperties = Object.values(task)
		addTaskContainer(...taskProperties)

		// ? Más legible pero no escalable (si en un futuro quiero añadir más propiedades, la tendría que añadir manualmente)
		// const taskPropertiesExplicit = [task.id, task.title, task.priority, task.project, task.done]
		// addTaskContainer(...taskPropertiesExplicit)
	})

	// * Add at the bottom of the list the completed tasks
	tasksCompleted.forEach((task) => {
		const taskProperties = Object.values(task)
		addTaskContainer(...taskProperties)
	})

	// TODO: order by completion

	const taskContainer = document.querySelectorAll(".taskContainer")
	taskContainer.forEach((taskElement) => {
		taskElement.addEventListener("click", () => {
			// * Toggle "done" property to "false" or "true"
			const taskID = Number(taskElement.dataset.index) // Get ID from the task container
			const taskFromList = getTaskFromList() // Search the task in the list
			const isTaskCompleted = taskFromList.done // Check if the task is completed

			isTaskCompleted ? (taskFromList.done = false) : (taskFromList.done = true) // Toggle property "done"

			// * Aplicar los estilos correspondientes a "true" o "false"
			taskStyles(taskElement, isTaskCompleted)

			// TODO: Sort task list
			// --> If a task is marked as completed, it should be placed at the end of the list
			// --> If a task is completed and came back to uncompleted, it should be placed in its ID order

			console.log(taskFromList)

			function getTaskFromList() {
				let task

				allTasks.forEach((taskObject) => {
					const matchID = taskID === taskObject.id
					if (matchID) {
						task = taskObject
					}
				})

				return task
			}
		})
	})

	// * Btn add new task
	const btnAddTask = document.getElementById("btnAddTask")
	btnAddTask.addEventListener("click", newTaskSettings)
})()

function newTaskSettings() {
	const mainSection = document.getElementById("mainSection")
	btnAddTask.style.display = "none"
	mainSection.appendChild(openNewTaskSettings())
	setTaskSettings()
}

function setTaskSettings() {
	//Cuando hago click en el tick, se completa la tarea

	// Cuando hago click en los botones de prioridad, cambian de colores

	//Botón cerrar ventana
	const btnClose = document.getElementById("btnClose")
	btnClose.addEventListener("click", () => {
		const btnAddTask = document.getElementById("btnAddTask")
		btnAddTask.removeAttribute("style")

		const taskSettingsContainer = document.getElementById("divSettings")
		taskSettingsContainer.remove()
	})
}
