export const DOMSkeleton = () => {
	const content = document.getElementById("content")
	const mainSection = document.createElement("main")
	mainSection.id = "mainSection"

	const title = document.createElement("h1")
	title.id = "mainTitle"
	title.textContent = "All tasks"

	const taskList = document.createElement("div")
	taskList.id = "tasksList"

	const btnAddNewTask = btnAddTask()

	content.appendChild(mainSection)
	mainSection.appendChild(title)
	mainSection.appendChild(taskList)
	mainSection.appendChild(btnAddNewTask)

	function createTaskContainer({ id, title, priority, project, done }) {
		const taskList = document.getElementById("tasksList")

		const taskContainer = document.createElement("div")
		taskContainer.setAttribute("data-index", id)
		taskContainer.classList.add("taskContainer")
		taskList.appendChild(taskContainer)

		// const taskContainerContent = document.createElement("div")
		// taskContainerContent.classList.add("taskContainerContent")
		// taskContainer.appendChild(taskContainerContent)

		const taskInfoContainer = document.createElement("div")
		taskInfoContainer.classList.add("taskInfo")
		taskContainer.appendChild(taskInfoContainer)

		const icon = document.createElement("i")
		icon.classList.add("fa-regular")
		taskInfoContainer.appendChild(icon)

		const taskTitle = document.createElement("p")
		taskTitle.textContent = title
		taskInfoContainer.appendChild(taskTitle)

		if (done) {
			taskContainer.classList.add("taskCompleted")
			icon.classList.add("fa-square-check")
			taskTitle.classList.add("textLineThrough")
		}

		if (!done) {
			icon.classList.add("fa-square")
		}

		// Priority label
		const labelPriority = document.createElement("div")
		labelPriority.classList.add("label", `${priority.toLowerCase()}Priority`)
		taskInfoContainer.appendChild(labelPriority)

		const textPriorityLabel = document.createElement("p")
		textPriorityLabel.textContent = priority
		labelPriority.appendChild(textPriorityLabel)

		// Project label
		const labelProject = document.createElement("div")
		labelProject.classList.add("label", "disabled")
		taskInfoContainer.appendChild(labelProject)

		const textProjectLabel = document.createElement("p")
		textProjectLabel.textContent = project
		labelProject.appendChild(textProjectLabel)

		const taskDetails = document.createElement("div")
		taskDetails.classList.add("taskDetails")
		taskContainer.appendChild(taskDetails)

		const datePicker = document.createElement("div")
		datePicker.textContent = "Aquí va selector fecha"
		datePicker.id = "datePicker"
		taskDetails.appendChild(datePicker)

		const iconMore = document.createElement("i")
		iconMore.classList.add("fa-solid", "fa-ellipsis-vertical")
		iconMore.id = "btnMoreOptions"
		taskDetails.appendChild(iconMore)

		return taskList
	}

	function newTaskSettings() {
		const settingsContainer = document.createElement("div")
		settingsContainer.id = "divSettings"
		settingsContainer.classList.add("taskSettingsContainer")

		// Title
		const titleContainer = document.createElement("div")
		titleContainer.classList.add("titleContainer")

		const icon = document.createElement("i")
		icon.classList.add("fa-regular", "fa-square")

		const inputTitle = document.createElement("input")
		inputTitle.classList.add("inputTitle")
		inputTitle.placeholder = "Ej: poner lavadora"
		inputTitle.id = "inputTitleSettings"

		settingsContainer.appendChild(titleContainer)
		titleContainer.appendChild(icon)
		titleContainer.appendChild(inputTitle)

		// Labels
		const labelsContainer = document.createElement("div")
		labelsContainer.classList.add("labelsContainer")

		const priorityLabelsContainer = document.createElement("div")
		priorityLabelsContainer.classList.add("priorityLabelsContainer")

		const priority = document.createElement("p")
		priority.textContent = "Prioridad"

		const btnLow = document.createElement("button")
		btnLow.classList.add("btnSetting", "lowPriority")
		btnLow.id = "btnLabelSelected"
		btnLow.textContent = "Low"

		const btnMedium = document.createElement("button")
		btnMedium.classList.add("btnSetting")
		btnMedium.textContent = "Medium"

		const btnHigh = document.createElement("button")
		btnHigh.classList.add("btnSetting")
		btnHigh.textContent = "High"

		const projectLabelsContainer = document.createElement("div")
		projectLabelsContainer.classList.add("projectLabelsContainer")

		const project = document.createElement("p")
		project.textContent = "Proyecto"

		const divProjectLabel = document.createElement("div")
		divProjectLabel.classList.add("projectLabel")

		const textProjectLabel = document.createElement("p")
		textProjectLabel.textContent = "No disponible"

		settingsContainer.appendChild(labelsContainer)

		labelsContainer.appendChild(priorityLabelsContainer)
		priorityLabelsContainer.appendChild(priority)
		priorityLabelsContainer.appendChild(btnLow)
		priorityLabelsContainer.appendChild(btnMedium)
		priorityLabelsContainer.appendChild(btnHigh)

		labelsContainer.appendChild(projectLabelsContainer)
		projectLabelsContainer.appendChild(project)
		projectLabelsContainer.appendChild(divProjectLabel)
		divProjectLabel.appendChild(textProjectLabel)

		// Buttons
		const btnAddNewTask = btnAddTask()
		const btnCloseSettings = btnClose()

		settingsContainer.appendChild(btnAddNewTask)
		settingsContainer.appendChild(btnCloseSettings)
		mainSection.appendChild(settingsContainer)

		return settingsContainer
	}

	function btnAddTask() {
		const btnAddTask = document.createElement("button")
		btnAddTask.textContent = "Añadir tarea"
		btnAddTask.id = "btnAddTask"
		btnAddTask.classList.add("btnBig", "btnAccent")
		return btnAddTask
	}

	function btnClose() {
		const btnClose = document.createElement("button")
		btnClose.textContent = "Cerrar"
		btnClose.id = "btnClose"
		btnClose.classList.add("btnBig")
		btnClose.classList.add("btnUnderlined")
		return btnClose
	}

	return { content, createTaskContainer, newTaskSettings, btnAddTask, btnClose }
}

function existingTaskSettings() {}
