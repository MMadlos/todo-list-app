const content = document.getElementById("content")

const DOMSkeleton = () => {
	const mainSection = document.createElement("main")
	mainSection.id = "mainSection"
	content.appendChild(mainSection)

	const title = document.createElement("h1")
	title.id = "mainTitle"
	title.textContent = "All tasks"
	mainSection.appendChild(title)

	const divTasksList = document.createElement("div")
	divTasksList.id = "tasksList"
	mainSection.appendChild(divTasksList)

	mainSection.appendChild(btnAddTask())
}

function addTaskContainer({ id, title, priority, project, done }) {
	const divTasksList = document.getElementById("tasksList")
	const taskContainer = document.createElement("div")
	taskContainer.setAttribute("data-index", id)

	const taskTitle = document.createElement("p")

	if (done) {
		const iconTaskComplete = document.createElement("i")
		iconTaskComplete.classList.add("fa-regular", "fa-square-check")
		taskTitle.classList.add("textLineThrough")
		taskContainer.classList.add("taskCompleted")

		taskContainer.appendChild(iconTaskComplete)
	}

	if (!done) {
		const iconTaskUncomplete = document.createElement("i")
		iconTaskUncomplete.classList.add("fa-regular", "fa-square")
		taskContainer.appendChild(iconTaskUncomplete)
	}

	const divPriorityLabel = document.createElement("div")
	const textPriorityLabel = document.createElement("p")

	const divProjectLabel = document.createElement("div")
	const textProjectLabel = document.createElement("p")

	taskContainer.classList.add("taskContainer")

	divPriorityLabel.classList.add("label", `${priority.toLowerCase()}Priority`)
	divProjectLabel.classList.add("label", "disabled")

	taskTitle.textContent = title
	textPriorityLabel.textContent = priority
	textProjectLabel.textContent = project

	divTasksList.appendChild(taskContainer)
	taskContainer.appendChild(taskTitle)

	divPriorityLabel.appendChild(textPriorityLabel)
	divProjectLabel.appendChild(textProjectLabel)

	taskContainer.appendChild(divPriorityLabel)
	taskContainer.appendChild(divProjectLabel)
}

function newTaskSettings() {
	const divSettings = document.createElement("div")

	const divTaskTitle = document.createElement("div")
	const iconTaskUncomplete = document.createElement("i")
	const inputTitle = document.createElement("input")

	divSettings.id = "divSettings"

	divSettings.classList.add("taskSettingsContainer")
	divTaskTitle.classList.add("titleContainer")
	iconTaskUncomplete.classList.add("fa-regular", "fa-square")
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
	btnLow.classList.add("btnSetting", "lowPriority")
	btnLow.id = "btnLabelSelected"
	btnMedium.classList.add("btnSetting")
	btnHigh.classList.add("btnSetting")

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

function taskStyles(container, isCompleted) {
	const getCurrentIcon = container.querySelector("i")
	const getTaskTitle = container.querySelector("p")

	if (isCompleted) {
		getCurrentIcon.classList.remove("fa-square-check")
		getCurrentIcon.classList.add("fa-square")
		getTaskTitle.classList.remove("textLineThrough")
		container.classList.remove("taskCompleted")
	}

	if (!isCompleted) {
		getCurrentIcon.classList.add("fa-square-check")
		getCurrentIcon.classList.remove("fa-square")
		getTaskTitle.classList.add("textLineThrough")
		container.classList.add("taskCompleted")
	}
}

export { DOMSkeleton, addTaskContainer, newTaskSettings, taskStyles }
