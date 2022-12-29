import "./styles.css"
import { DOMSkeleton, addTaskContainer } from ".//modules/DOM.js"
import { allTasks } from "./modules/task.js"

const init = (() => {
	const DOM = DOMSkeleton()
	console.table(allTasks)

	// TODO: Filter only the tasks with done "false"
	allTasks.forEach((task) => {
		const taskArray = Object.entries(task)
	})

	// TODO: Sort tasks by its ID (but I only want to sort tasks with "done:" property as "false")
	// allTasks.sort((a, b) => {
	// 	return a.id - b.id
	// })

	allTasks.forEach((task) => {
		const taskProperties = Object.values(task)
		addTaskContainer(...taskProperties)

		// ? Más legible pero no escalable (si en un futuro quiero añadir más propiedades, la tendría que añadir manualmente)
		// const taskPropertiesExplicit = [task.id, task.title, task.priority, task.project, task.done]
		// addTaskContainer(...taskPropertiesExplicit)
	})

	// const taskContainer = document.querySelectorAll(".taskContainer")

	// taskContainer.forEach((task) => {
	// 	task.addEventListener("click", () => {
	// 		// Cambia la propiedad "done:" de la tarea de "false" a "true" o viceversa
	// 		const taskID = Number(task.dataset.index)
	// 		let taskFromArray
	// 		Object.values(allTasks).forEach((value) => {
	// 			if (value.id === taskID) {
	// 				taskFromArray = value
	// 				return taskFromArray
	// 			}
	// 		})

	// 		taskFromArray.done ? (taskFromArray.done = false) : (taskFromArray.done = true)

	// 		// Añade el icono en función de si "done" es "true" o "false"
	// 		// Añade los estilos cuando una tarea está completada
	// 		const tasksList = document.getElementById("tasksList")
	// 		const taskTitle = task.querySelector("p")

	// 		if (taskFromArray.done) {
	// 			const currentIcon = task.querySelector("i")

	// 			currentIcon.classList.remove("fa-square-check")
	// 			currentIcon.classList.add("fa-square")
	// 			taskTitle.classList.toggle("textLineThrough")
	// 			task.classList.toggle("taskCompleted")
	// 			tasksList.appendChild(task)

	// 			// tasksList.remove()
	// 		} else {
	// 			const currentIcon = task.querySelector("i")
	// 			currentIcon.classList.add("fa-square-check")
	// 			currentIcon.classList.remove("fa-square")
	// 			taskTitle.classList.toggle("textLineThrough")
	// 			task.classList.toggle("taskCompleted")
	// 			// Eliminar el listado actual
	// 			// Volver a ordenar tal y como estaba la tarea
	// 			// Imprimir listado en pantalla

	// 			// allTasks.sort((a, b) => {
	// 			// 	return a.id - b.id
	// 			// })

	// 			// allTasks.forEach((task) => {
	// 			// 	DOM.addTaskContainer(task.title, task.priority, task.project, task.id)
	// 			// })
	// 		}

	// 		// DOM
	// 	})
	// })

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
