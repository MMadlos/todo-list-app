import "./styles.css"
import { DOMSkeleton } from ".//modules/DOM.js"
import { allTasks } from "./modules/task.js"

const init = (() => {
	const DOM = DOMSkeleton()

	allTasks.forEach((task) => {
		console.log(task.title)

		DOM.addTaskContainer(task.title, task.priority, task.project)
	})

	//Abrir la ventana de New Task Settings cuando hago click en "Añadir tarea"
	const mainSection = document.getElementById("mainSection")
	const btnAddTask = document.getElementById("btnAddTask")
	btnAddTask.addEventListener("click", () => {
		btnAddTask.style.display = "none"
		mainSection.appendChild(DOM.openNewTaskSettings())
		newTaskSettings()
	})
})()

function newTaskSettings() {
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
