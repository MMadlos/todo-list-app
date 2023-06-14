import "./styles.css"
import { taskPanelComponent } from ".//modules/DOM"
import { menuUI } from "./modules/DOM/menu"
import { mainUI, taskCardUI } from "./modules/DOM/main-section"
import { projectList, taskList, createTask } from "./modules/task.js"

const menuDOM = menuUI()
const mainDOM = mainUI()
const defaultTaskList = getTasksFromProject("Tutorial")

initApp()

function initApp() {
	menuDOM.display()
	mainDOM.display()
	addNumberOfTasksToCounter()
	menuEventListeners()
	renderTaskList()
	mainDOM.editHeader()
	cardEventListeners()
	btnAddTaskEventListeners()
}

function addNumberOfTasksToCounter() {
	const allProjectItems = document.querySelectorAll("[project]")
	allProjectItems.forEach((project) => {
		const projectName = project.querySelector("p").textContent
		const numberOfTasks = getTasksFromProject(projectName).length

		const counterElement = project.querySelector("div:last-of-type > p")
		counterElement.textContent = numberOfTasks
	})
}

function getTasksFromProject(projectName) {
	const _projectName = projectName
	const propertyNames = {
		Planificado: "dueDate",
		Importantes: "isImportant",
		Completados: "isCompleted",
	}

	if (_projectName === "Todos") return taskList

	const propertyToFilter = propertyNames[_projectName]
	const tasksProject = taskList.filter((task) => {
		if (_projectName === "Planificado") return task[propertyToFilter] !== ""
		if (propertyToFilter === undefined) return task.project === projectName

		return task[propertyToFilter]
	})

	return tasksProject
}

function menuEventListeners() {
	const menuElement = document.querySelector("#menu")
	menuElement.addEventListener("click", (e) => {
		const projectContainer = e.target.closest(".project-item-container")
		const btnAddProject = e.target.closest("#btn-add-project")
		const currentProjectSelected = menuElement.querySelector(".selected")

		if (!projectContainer && !btnAddProject) return

		let projectName
		if (projectContainer) {
			currentProjectSelected.classList.remove("selected")
			projectContainer.classList.toggle("selected")

			projectName = projectContainer.querySelector("p").textContent
		}

		if (btnAddProject) {
			projectName = "Nombre por defecto"
			const isDuplicatedNames = projectList.includes(projectName)

			if (isDuplicatedNames) {
				const filterDuplicated = projectList.filter((project) => project.includes(projectName))
				const countDuplicated = filterDuplicated.length

				projectName = `${projectName} (${countDuplicated})`
			}

			projectList.push(projectName)
			menuDOM.addNewProject(projectName)
			addNumberOfTasksToCounter()
		}

		mainDOM.editHeader()

		const projectTasks = getTasksFromProject(projectName)
		updateTaskList(projectTasks)
	})
}

function btnAddTaskEventListeners() {
	const content = document.querySelector("#content")
	const menuSection = document.querySelector("#menu")
	const mainSection = document.querySelector("#main-section")

	const addTaskElement = document.querySelector(".new-task-input-container")
	const inputElement = mainSection.querySelector("#new-task")
	content.addEventListener("click", (e) => {
		const addTaskState = addTaskElement.getAttribute("state")

		const isBtnActive = addTaskState === "active"
		const isBtnClicked = e.target.closest(".new-task-input-container")

		if (!isBtnActive && isBtnClicked) {
			mainDOM.toggleTaskBtnTo("active")
			inputElement.focus()
		}

		if (isBtnActive && !isBtnClicked) {
			if (inputElement.value) return
			if (!inputElement.value) mainDOM.toggleTaskBtnTo("inactive")
		}
	})

	addTaskElement.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return
		const newTaskTitle = inputElement.value
		const projectSelected = menuSection.querySelector(".selected").getAttribute("project")

		const newTask = createTask(newTaskTitle)
		if (projectSelected === "Planificado") newTask.properties.dueDate = "Hoy"
		if (projectSelected === "Importantes") newTask.properties.isImportant = true
		if (projectSelected === "Completados") newTask.properties.isCompleted = true
		if (projectSelected !== "Completados" && projectSelected !== "Importantes" && projectSelected !== "Planificado" && projectSelected !== "Todos") {
			newTask.properties.project = projectSelected
		}

		mainDOM.toggleTaskBtnTo("inactive")
		inputElement.value = ""
		inputElement.blur()

		const projectTasks = getTasksFromProject(projectSelected)
		updateTaskList(projectTasks)
	})
}

editProjectTitle()
function editProjectTitle() {
	// Sólo se puede editar el título si el proyecto seleccionado es custom

	// Al hacer click en el título, el elemento se tiene que convertir en input para poder editarlo.
	const mainSection = document.getElementById("main-section")
	const titleContainer = mainSection.querySelector(".title-container")
	const titleParagraph = titleContainer.querySelector("p")

	const customProjectListContainer = document.querySelector("[custom-projects]")

	//Si el proyecto seleccionado no está dentro de custom projects -> Return

	const input = document.createElement("input")
	input.classList.add("hide")

	titleContainer.append(input)

	let hasTitleChanged = false

	mainSection.addEventListener("click", (e) => {
		const selectedProjectContainer = customProjectListContainer.querySelector(".selected")

		if (!customProjectListContainer.contains(selectedProjectContainer)) return

		const isTitleClicked = e.target.closest(".title-container")
		if (isTitleClicked && !hasTitleChanged) {
			titleContainer.classList.add("edit")
			titleParagraph.classList.add("hide")
			input.removeAttribute("class")
			input.placeholder = titleParagraph.textContent
			input.focus()

			hasTitleChanged = true
		}

		if (!isTitleClicked && hasTitleChanged) {
			titleContainer.classList.remove("edit")
			titleParagraph.removeAttribute("class")
			titleParagraph.textContent = input.value === "" ? input.placeholder : input.value
			input.classList.add("hide")

			hasTitleChanged = false
		}
	})

	input.addEventListener("keydown", (e) => {
		const selectedProjectContainer = customProjectListContainer.querySelector(".selected")
		const selectedProjectName = selectedProjectContainer.querySelector("p")

		if (!hasTitleChanged) return
		if (e.key !== "Enter") return

		titleContainer.classList.remove("edit")
		titleParagraph.removeAttribute("class")
		titleParagraph.textContent = input.value === "" ? input.placeholder : input.value
		input.classList.add("hide")

		hasTitleChanged = false

		// Cambiar en el menú
		const projectName = selectedProjectName.textContent

		// Cambiar en las tareas asociadas
		const _taskList = getTasksFromProject(projectName)
		_taskList.forEach((task) => (task.project = titleParagraph.textContent))

		selectedProjectName.textContent = titleParagraph.textContent
		updateTaskList(_taskList)
		input.value = ""
	})
}

function renderTaskList(taskListOrigin = defaultTaskList) {
	taskListOrigin.forEach((task) => {
		const taskCard = taskCardUI()
		const taskCardDOM = taskCard.display()

		const taskTitle = task.title
		const isCompleted = task.isCompleted
		const isImportant = task.isImportant

		const dueDate = task.dueDate
		const projectName = task.project
		const hasFileAttached = task.isFileAttached

		taskCard.title(taskTitle)
		taskCard.tickIcon(isCompleted)
		taskCard.iconImportant(isImportant)

		taskCard.addTag("date", dueDate)
		taskCard.addTag("project", projectName)
		taskCard.addTag("file", hasFileAttached)
		taskCard.tagSeparator()

		const taskIndex = taskList.indexOf(task)
		taskCardDOM.dataset.index = taskIndex
	})
}

// TODO --> REVISAR A PARTIR DE AQUÍ
function updateTaskList(taskListOrigin) {
	removeTaskList()
	renderTaskList(taskListOrigin)
	addNumberOfTasksToCounter()
	cardEventListeners()
}

function cardEventListeners() {
	const allCards = document.querySelectorAll(".task-card-container")
	for (const card of allCards) {
		checkIconEventListeners(card)
		card.addEventListener("click", (e) => {
			const tickIcon = e.target.closest(".task-info-container > i")
			const starIcon = e.target.closest(".fa-star")

			const cardIndex = card.dataset.index
			const taskFromList = taskList[cardIndex]

			if (tickIcon) {
				const taskText = tickIcon.nextElementSibling.querySelector("p")
				taskText.classList.toggle("task-done")
				taskFromList.isCompleted = !taskFromList.isCompleted
				return
			}

			if (starIcon) {
				toggleClasses(starIcon, "fa-solid", "fa-regular", "is-important")
				taskFromList.isImportant = !taskFromList.isImportant
				return
			}

			const isAnotherCardSelected = document.querySelector(`[card-selected]`) ? true : false
			const cardCurrentSelected = document.querySelector(`[card-selected]`) ?? false
			card.setAttribute("card-selected", "")

			if (!isAnotherCardSelected) return openTaskPanel()
			if (card === cardCurrentSelected) return

			cardCurrentSelected.removeAttribute("card-selected")
			updateTaskPanel()
		})
	}
}

function openTaskPanel() {
	renderTaskPanel()
	taskPanelEventListeners()
}

function renderTaskPanel() {
	const taskPanelDOM = taskPanelComponent()
	taskPanelDOM.display()

	const cardSelected = document.querySelector("[card-selected]")
	const indexCard = cardSelected.dataset.index
	const taskFromList = taskList[indexCard]
	const { isCompleted, title, steps, isImportant, dueDate, project, isFileAttached, note } = taskFromList

	taskPanelDOM.tickIcon(isCompleted)
	taskPanelDOM.taskTitle(title)
	taskPanelDOM.taskStepsList(steps)
	taskPanelDOM.isTaskImportant(isImportant)
	taskPanelDOM.hasTaskDueDate(dueDate)
	taskPanelDOM.project(project)
	taskPanelDOM.file(isFileAttached)
	taskPanelDOM.note(note)
}

function taskPanelEventListeners() {
	const taskPanel = document.getElementById("task-panel")

	// checkIconEventListeners(taskPanel)

	taskPanel.addEventListener("click", (e) => {
		const btnClosePanel = e.target.closest("#btn-close-panel")
		const checkIcon = e.target.closest("i.fa-square") || e.target.closest("i.fa-square-check")
		const taskDetailsContainer = e.target.closest(".task-details-item-container")
		const btnSave = e.target.closest("#btn-save")
		const btnAddStep = e.target.closest("#btn-add-step")

		if (btnAddStep) {
			const taskStepsContainer = document.querySelector(".task-steps-container")
			const stepContainer = document.createElement("div")
			stepContainer.className = "task-step-container"

			const tickIcon = document.createElement("i")
			tickIcon.classList.add("fa-regular", "fa-square", "size-16")

			const stepTextDOM = document.createElement("input")
			stepTextDOM.placeholder = "Nombre del paso"

			stepContainer.append(tickIcon, stepTextDOM)

			taskStepsContainer.insertBefore(stepContainer, btnAddStep)
			stepTextDOM.focus()
		}

		if (btnClosePanel) {
			taskPanel.remove()
			const selectedCard = document.querySelector("[card-selected]")
			selectedCard.removeAttribute("card-selected")
		}

		if (checkIcon) {
			const taskText = checkIcon.nextElementSibling
			taskText.classList.toggle("task-done")
		}

		if (taskDetailsContainer) {
			const itemType = taskDetailsContainer.dataset.itemType
			const detailsContainer = taskDetailsContainer.querySelector(".task-details-info-container")
			const isContainerSelected = detailsContainer.classList.contains("selected")

			const taskDetailtext = taskDetailsContainer.querySelector("p")
			const iconStar = taskDetailsContainer.querySelector(".fa-star")
			const iconClose = taskDetailsContainer.querySelector(".fa-xmark")
			const iconChevron = taskDetailsContainer.querySelector(".fa-chevron-down")
				? taskDetailsContainer.querySelector(".fa-chevron-down")
				: taskDetailsContainer.querySelector(".fa-chevron-right")

			if (itemType === "project-name") {
				toggleClasses(iconChevron, "fa-chevron-down", "fa-chevron-right")
				detailsContainer.classList.toggle("selected")
				taskDetailtext.textContent = isContainerSelected ? "Seleccionar proyecto" : "Tutorial"

				return
			}

			if (isContainerSelected && e.target !== iconClose) return
			if (itemType === "important") toggleClasses(iconStar, "is-important", "fa-solid", "fa-regular")

			iconClose.classList.toggle("hide")
			detailsContainer.classList.toggle("selected")

			const _typeText = {
				important: isContainerSelected ? "Marcar como importante" : "Marcado como importante",
				"due-date": isContainerSelected ? "Añadir vencimiento" : `Vence el "xxxx"`,
				"attach-file": isContainerSelected ? "Adjuntar archivo" : `Archivo adjunto`,
			}
			taskDetailtext.textContent = _typeText[itemType]
		}

		if (btnSave) {
			const taskTitle = taskPanel.querySelector(".task-panel-title-container > input")
			const importanceContainer = taskPanel.querySelector(`[data-item-type="important"] > div`)
			const dueDateContainer = taskPanel.querySelector(`[data-item-type="due-date"] > div`)
			const projectContainer = taskPanel.querySelector(`[data-item-type="project-name"] > div`)
			const fileContainer = taskPanel.querySelector(`[data-item-type="attach-file"] > div`)
			const noteContainer = taskPanel.querySelector("#add-note-field")
			const allSteps = document.querySelectorAll(".task-step-container")

			const _taskPanel = {
				title: taskTitle.value,
				steps: [],
				isCompleted: taskTitle.classList.contains("task-done"),
				isImportant: importanceContainer.classList.contains("selected"),
				dueDate: dueDateContainer.classList.contains("selected") ? "Hoy" : "",
				project: projectContainer.classList.contains("selected") ? projectContainer.querySelector(`p`).textContent : "",
				isFileAttached: fileContainer.classList.contains("selected"),
				note: noteContainer.value,
			}

			allSteps.forEach((step) => {
				const isCompleted = step.querySelector("input").classList.contains("task-done")
				const stepName = step.querySelector("input").value

				_taskPanel.steps.push({ isCompleted: isCompleted, stepName: stepName })
			})

			const cardSelectedIndex = document.querySelector("[card-selected]").dataset.index
			taskList[cardSelectedIndex] = _taskPanel

			updateTaskList(taskList)
			taskPanel.remove()
		}
	})
}

// UTILITIES
function toggleClasses(element, ...classes) {
	const _element = element
	const _classes = [...classes]

	for (let _class of _classes) {
		_element.classList.toggle(_class)
	}
}

function checkIconEventListeners(parentElement) {
	const checkIcon = parentElement.querySelector(".fa-square-check") ?? parentElement.querySelector(".fa-square")
	;["mouseover", "mouseout"].forEach((event) => {
		checkIcon.addEventListener(event, () => {
			toggleClasses(checkIcon, "fa-square", "fa-square-check")
		})
	})

	checkIcon.addEventListener("click", (e) => {
		toggleClasses(checkIcon, "fa-solid", "fa-regular", "fa-square-check", "fa-square")
	})
}

function removeTaskList() {
	document.querySelectorAll(".task-card-container").forEach((card) => {
		card.remove()
	})
}

function updateTaskPanel() {
	const taskPanel = document.getElementById("task-panel")
	taskPanel.remove()

	openTaskPanel()
}
