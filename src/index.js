import "./styles.css"
import { DOMSkeleton } from ".//modules/DOM.js"
import { allTasks } from "./modules/task.js"

const init = (() => {
	const DOM = DOMSkeleton()

	allTasks.sort((a, b) => {
		return a.id - b.id
	})

	allTasks.forEach((task) => {
		DOM.addTaskContainer(task.title, task.priority, task.project, task.id)
	})

	// TODO: Cuando hago click en una tarea:
	// * --> El icono cambia a completado
	// * --> Se tacha el título de la tarea
	// * --> Se transparenta todo el div al 50%
	// * --> El div se pasa al final de la lista
	// TODO --> Cuando hago click, cambiar la priopiedad de la tarea de "done: false" a "done: true"

	const tasksList = document.getElementById("tasksList")
	const taskContainer = document.querySelectorAll(".taskContainer")

	console.table(allTasks)
	console.table(
		Object.values(allTasks).forEach((value) => {
			console.log(value.title)
		})
	)

	taskContainer.forEach((task) => {
		task.addEventListener("click", () => {
			// Cambia la propiedad "done:" de la tarea de "false" a "true"
			const taskID = Number(task.dataset.index)
			let taskFromArray
			Object.values(allTasks).forEach((value) => {
				if (value.id === taskID) {
					taskFromArray = value
					return taskFromArray
				}
			})
			taskFromArray.done ? (taskFromArray.done = false) : (taskFromArray.done = true)

			// DOM
			const iconCheck = task.querySelector(".fa-square-check")
			const iconNotCheck = task.querySelector(".fa-square")

			iconCheck.classList.toggle("notVisible")
			iconNotCheck.classList.toggle("notVisible")

			const taskTitle = task.querySelector("p")
			taskTitle.classList.toggle("textLineThrough")

			task.classList.toggle("taskCompleted")
			tasksList.appendChild(task)
		})
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

function toggleTaskCompletion() {
	const iconCheck = document.querySelector(".fa-square-check")
	const iconNotCheck = document.querySelector(".fa-square")

	iconCheck.classList.toggle("notVisible")
	iconNotCheck.classList.toggle("notVisible")

	const taskTitle = document.querySelector("p")
	taskTitle.classList.toggle("textLineThrough")
}
