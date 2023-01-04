import "./styles.css"
import { DOMSkeleton } from ".//modules/DOM"
import { Todos } from "./modules/task.js"

const init = (() => {
	const DOM = DOMSkeleton()
	const Task = Todos()
	const TaskList = Task.list

	Task.addDefaultTasks()
	Task.sortByID()
	printTasks(TaskList)
	toggleTaskCompletion()

	DOM.newTaskSettings()
	settingsEventListeners()

	// * Btn add new task
	const btnAddTask = document.getElementById("btnAddTask")
	btnAddTask.addEventListener("click", () => {
		btnAddTask.style.display = "none"

		DOM.newTaskSettings()
		settingsEventListeners()
		window.scrollBy(0, window.innerHeight)
	})

	function printTasks(list) {
		const taskContainerAll = document.querySelectorAll(".taskContainer")
		for (const taskContainer of taskContainerAll) {
			taskContainer.remove()
		}

		for (const task of list) {
			DOM.createTaskContainer(task)
		}
	}

	function toggleTaskCompletion() {
		const taskContainerAll = document.querySelectorAll(".taskContainer")
		for (const taskContainer of taskContainerAll) {
			taskContainer.addEventListener("click", () => {
				const containerID = Number(taskContainer.dataset.index)
				const taskFromList = Task.getByID(containerID)

				const isTaskCompleted = taskFromList.done
				const icon = taskContainer.querySelector("i")
				const title = taskContainer.querySelector("p")

				if (isTaskCompleted) {
					taskFromList.done = false
					icon.classList.remove("fa-square-check")
					icon.classList.add("fa-square")
					title.classList.remove("textLineThrough")
					taskContainer.classList.remove("taskCompleted")
					return
				}
				if (!isTaskCompleted) {
					taskFromList.done = true
					icon.classList.add("fa-square-check")
					icon.classList.remove("fa-square")
					title.classList.add("textLineThrough")
					taskContainer.classList.add("taskCompleted")
					return
				}
			})
		}
	}

	function settingsEventListeners() {
		//Cuando hago click en el tick, se completa la tarea
		const currentIcon = document.querySelector("#divSettings > .titleContainer > i")
		currentIcon.onclick = () => {
			currentIcon.classList.toggle("fa-square")
			currentIcon.classList.toggle("fa-square-check")

			currentIcon.classList.contains("fa-square-check") ? (currentIcon.id = "taskCompleted") : currentIcon.removeAttribute("id")
		}

		// Cuando hago click en los botones de prioridad, cambian de colores
		const priorityLabels = document.querySelectorAll(".btnSetting")
		for (const button of priorityLabels) {
			button.addEventListener("click", () => {
				const isBtnSelected = button.id === "btnLabelSelected"

				if (!isBtnSelected) {
					const currentBtnSelected = document.getElementById("btnLabelSelected")
					currentBtnSelected.removeAttribute("id")
					currentBtnSelected.classList.remove(`${currentBtnSelected.textContent.toLowerCase()}Priority`)

					button.id = "btnLabelSelected"
					button.classList.add(`${button.textContent.toLowerCase()}Priority`)
				}
			})
		}

		// Cuando hago click en añadir tarea, se añaden los valores a la tarea
		const btnAddTaskForm = document.querySelector("#divSettings > #btnAddTask")
		btnAddTaskForm.addEventListener("click", () => {
			const values = getFormValues()
			Task.addTask(values)
			printTasks(TaskList)
			toggleTaskCompletion()
			window.scrollBy(0, window.innerHeight)

			// Reset values
			const taskSettingsContainer = document.getElementById("divSettings")
			taskSettingsContainer.remove()
			DOM.newTaskSettings()
			settingsEventListeners()
		})

		//Botón cerrar ventana
		const btnClose = document.getElementById("btnClose")
		btnClose.addEventListener("click", () => {
			const btnAddTask = document.getElementById("btnAddTask")
			btnAddTask.removeAttribute("style")

			const taskSettingsContainer = document.getElementById("divSettings")
			taskSettingsContainer.remove()
		})
	}

	function getFormValues() {
		const title = document.getElementById("inputTitleSettings").value
		if (title === "") {
			return alert("Please put a name to your task")
		}

		const priority = document.getElementById("btnLabelSelected").textContent
		const project = "Not asigned"
		const done = document.querySelector("#divSettings > .titleContainer > i").id === "taskCompleted"

		return { title, priority, project, done }
	}
})()
