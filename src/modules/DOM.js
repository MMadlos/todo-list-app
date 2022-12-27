const content = document.getElementById("content")

const DOMSkeleton = () => {
	const mainSection = document.createElement("main")
	content.appendChild(mainSection)

	const title = document.createElement("h1")
	title.id = "mainTitle"
	title.textContent = "All tasks"
	mainSection.appendChild(title)

	const divTasksList = document.createElement("div")
	divTasksList.id = "tasksList"
	mainSection.appendChild(divTasksList)

	function taskContainer(title, priority, project) {
		const taskContainer = document.createElement("div")

		const iconTaskUncomplete = document.createElement("i")
		const iconTaskComplete = document.createElement("i")

		const taskTitle = document.createElement("p")

		const divPriorityLabel = document.createElement("div")
		const textPriorityLabel = document.createElement("p")

		const divProjectLabel = document.createElement("div")
		const textProjectLabel = document.createElement("p")

		taskContainer.classList.add("taskContainer")
		iconTaskUncomplete.classList.add("fa-regular", "fa-square")
		iconTaskComplete.classList.add("fa-regular", "fa-square-check", "notVisible")
		divPriorityLabel.classList.add("label", `${priority.toLowerCase()}Priority`)
		divProjectLabel.classList.add("label", "disabled")

		taskTitle.textContent = title
		textPriorityLabel.textContent = priority
		textProjectLabel.textContent = project

		divTasksList.appendChild(taskContainer)
		taskContainer.appendChild(iconTaskUncomplete)
		taskContainer.appendChild(iconTaskComplete)
		taskContainer.appendChild(taskTitle)

		divPriorityLabel.appendChild(textPriorityLabel)
		divProjectLabel.appendChild(textProjectLabel)

		taskContainer.appendChild(divPriorityLabel)
		taskContainer.appendChild(divProjectLabel)
	}

	function taskSettings() {
		const divSettings = document.createElement("div")

		const divTaskTitle = document.createElement("div")
		const iconTaskUncomplete = document.createElement("i")
		const iconTaskComplete = document.createElement("i")
		const inputTitle = document.createElement("input")

		divSettings.classList.add("taskSettingsContainer")
		divTaskTitle.classList.add("titleContainer")
		iconTaskUncomplete.classList.add("fa-regular", "fa-square")
		iconTaskComplete.classList.add("fa-regular", "fa-square-check", "notVisible")
		inputTitle.classList.add("inputTitle")
		inputTitle.placeholder = "Ej: poner lavadora"
		inputTitle.id = "inputTitleSettings"

		divSettings.appendChild(divTaskTitle)
		divTaskTitle.appendChild(iconTaskUncomplete)
		divTaskTitle.appendChild(inputTitle)

		// Labels
		const labelsContainer = document.createElement("div")

		const priorityLabelsContainer = document.createElement("div")
		const priority = document.createElement("p")
		const btnLow = document.createElement("button")
		const btnMedium = document.createElement("button")
		const btnHigh = document.createElement("button")

		const projectLabelsContainer = document.createElement("div")
		const project = document.createElement("p")
		const divProjectLabel = document.createElement("div")
		const textProjectLabel = document.createElement("p")

		labelsContainer.classList.add("labelsContainer")
		priorityLabelsContainer.classList.add("priorityLabelsContainer")
		btnLow.classList.add("btnSetting")
		btnMedium.classList.add("btnSetting")
		btnHigh.classList.add("btnSetting", "highPriority")

		projectLabelsContainer.classList.add("projectLabelsContainer")
		divProjectLabel.classList.add("projectLabel")

		priority.textContent = "Prioridad"
		btnLow.textContent = "Low"
		btnMedium.textContent = "Medium"
		btnHigh.textContent = "High"

		project.textContent = "Proyecto"
		textProjectLabel.textContent = "No disponible"

		divSettings.appendChild(labelsContainer)

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
		divSettings.appendChild(btnAddTask())
		divSettings.appendChild(btnClose())
		return divSettings
	}

	// mainSection.appendChild(btnAddTask())
	mainSection.appendChild(taskSettings())

	return { taskContainer }
}

function btnAddTask() {
	const btnAddTask = document.createElement("button")
	btnAddTask.textContent = "Añadir tarea"
	btnAddTask.id = "btnAddTask"
	btnAddTask.classList.add("btnBig")
	btnAddTask.classList.add("btnAccent")
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

export { DOMSkeleton }
