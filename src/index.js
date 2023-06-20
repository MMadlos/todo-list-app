import "./styles.css"
import { taskPanelDOM } from "./modules/DOM/taskPanel"
import { menuDOM } from "./modules/DOM/menu"
import { mainDOM, taskCardUI } from "./modules/DOM/mainSection"
import { projectList, taskList, createTask, getTasksFromProject } from "./modules/task.js"

const defaultTaskList = getTasksFromProject("Tutorial")

//Init app:
displayMenu()
displayMainSection()

function displayMenu() {
	menuDOM.display()
	menuEventListeners()
}

function displayMainSection() {
	mainDOM.display()
	renderTaskList()
	mainDOM.setHeader()
	editProjectTitle()
	cardEventListeners()
	btnAddTaskEventListeners()
}

// |-- MENU -->
function menuEventListeners() {
	const menuElement = document.querySelector("#menu")
	menuElement.addEventListener("click", (e) => {
		const currentProjectSelected = menuElement.querySelector(".selected")

		const projectContainer = e.target.closest(".project-item-container")
		const btnAddProject = e.target.closest("#btn-add-project")

		if (!projectContainer && !btnAddProject) return
		if (projectContainer === currentProjectSelected) return

		let projectName
		if (projectContainer) {
			currentProjectSelected.classList.remove("selected")
			projectContainer.classList.add("selected")

			projectName = projectContainer.querySelector("p").textContent
		}

		if (btnAddProject) {
			projectName = "Nombre por defecto"
			const isNameDuplicated = projectList.includes(projectName)

			if (!isNameDuplicated) return

			const filterDuplicated = projectList.filter((project) => project.includes(projectName))
			const countDuplicated = filterDuplicated.length

			projectName = `${projectName} (${countDuplicated})`

			projectList.push(projectName)
			menuDOM.addNewProject(projectName)
		}

		mainDOM.setHeader()
		const projectTasks = getTasksFromProject(projectName)
		updateTaskList(projectTasks)
	})
}

// <--- MENU --|
// |-- MAIN PANEL -->

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
		const projectSelected = menuSection.querySelector(".selected").querySelector("p").textContent

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

function editProjectTitle() {
	const mainSection = document.getElementById("main-section")
	const titleContainer = mainSection.querySelector(".title-container")
	const titleParagraph = titleContainer.querySelector("p")
	const customProjectListContainer = document.querySelector("[custom-projects]")

	const input = document.createElement("input")
	input.classList.add("hide")

	titleContainer.append(input)

	let hasTitleChanged = false
	mainSection.addEventListener("click", (e) => {
		if (!customProjectListContainer.contains(customProjectListContainer.querySelector(".selected"))) return

		const isTitleClicked = e.target.closest(".title-container")
		if (isTitleClicked && !hasTitleChanged) {
			titleContainer.classList.add("edit")
			titleParagraph.classList.add("hide")
			input.removeAttribute("class")
			input.placeholder = titleParagraph.textContent
			input.focus()

			hasTitleChanged = true
		}

		if (!isTitleClicked && hasTitleChanged) updateTitleInAllElements()
	})

	input.addEventListener("keydown", (e) => {
		if (hasTitleChanged && e.key === "Enter") updateTitleInAllElements()
		// TODO -> Hay que cambiar también el nombre en el objeto con todos los nombres de los proyectos.
	})

	function updateTitleInAllElements() {
		const selectedProjectContainer = customProjectListContainer.querySelector(".selected")
		const selectedProjectName = selectedProjectContainer.querySelector("p")

		titleContainer.classList.remove("edit")
		titleParagraph.removeAttribute("class")
		titleParagraph.textContent = input.value === "" ? input.placeholder : input.value
		input.classList.add("hide")

		hasTitleChanged = false

		const projectName = selectedProjectName.textContent

		const _taskList = getTasksFromProject(projectName)
		_taskList.forEach((task) => (task.project = titleParagraph.textContent))

		selectedProjectName.textContent = titleParagraph.textContent
		updateTaskList(_taskList)
		input.value = ""
	}
}

function renderTaskList(sortedTaskList = defaultTaskList) {
	sortedTaskList.forEach((task) => {
		const { title, isCompleted, isImportant, dueDate, project, isFileAttached } = task
		const taskIndex = taskList.indexOf(task)
		const taskCard = taskCardUI()

		taskCard.display()
		taskCard.title(title)
		taskCard.setCheckIcon(isCompleted)
		taskCard.setStarIcon(isImportant)

		if (dueDate) taskCard.addTag({ dueDate })
		if (project) taskCard.addTag({ project })
		if (isFileAttached) taskCard.addTag({ isFileAttached })

		taskCard.addTagDividers()
		taskCard.addTaskIndex(taskIndex)
	})
}

function updateTaskList(sortedTaskList) {
	removeTaskList()
	renderTaskList(sortedTaskList)
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

				menuDOM.refreshTaskCounter()
				return
			}

			if (starIcon) {
				toggleClasses(starIcon, "fa-solid", "fa-regular", "is-important")
				taskFromList.isImportant = !taskFromList.isImportant

				menuDOM.refreshTaskCounter()
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

// let taskPanelDOM
function renderTaskPanel() {
	// taskPanelDOM = taskPanelComponent()

	const cardSelected = document.querySelector("[card-selected]")
	const indexCard = cardSelected.dataset.index
	const taskSelected = taskList[indexCard]
	const { isCompleted, title, steps, isImportant, dueDate, project, isFileAttached, note } = taskSelected

	taskPanelDOM.display()
	taskPanelDOM.checkIcon(isCompleted)
	taskPanelDOM.setTitle(title)
	taskPanelDOM.taskStepsList(steps)
	taskPanelDOM.isTaskImportant(isImportant)
	taskPanelDOM.hasTaskDueDate(dueDate)
	taskPanelDOM.project(project)
	taskPanelDOM.file(isFileAttached)
	taskPanelDOM.note(note)
}

function taskPanelEventListeners() {
	const taskPanel = document.getElementById("task-panel")
	checkIconEventListeners(taskPanel)

	// If the task panel is opened and I click in another project, it will close.
	const menuSection = document.getElementById("menu")
	menuSection.addEventListener("click", (e) => {
		const isTaskPanelOpened = document.getElementById("task-panel") ?? false
		const isProjectElement = e.target.closest(".project-item-container")
		if (isProjectElement && isTaskPanelOpened) {
			const taskPanel = document.getElementById("task-panel")
			taskPanel.remove()
		}
	})

	taskPanel.addEventListener("click", (e) => {
		const btnClosePanel = e.target.closest("#btn-close-panel")
		const checkIcon = e.target.closest("i.fa-square") || e.target.closest("i.fa-square-check")
		const taskDetailsContainer = e.target.closest(".task-details-item-container")
		const btnSave = e.target.closest("#btn-save")
		const btnAddStep = e.target.closest("#btn-add-step")
		const btnDelete = e.target.closest("#btn-delete")
		const selectedCard = document.querySelector("[card-selected]")

		const projectSelected = document.querySelector(".project-item-container.selected")
		const projectName = projectSelected.querySelector(".project-item-title-container > p").textContent

		if (btnClosePanel) {
			taskPanel.remove()
			selectedCard.removeAttribute("card-selected")
		}

		if (checkIcon) {
			const checkText = checkIcon.nextElementSibling
			checkText.classList.toggle("task-done")
		}

		if (btnAddStep) {
			const stepContainer = taskPanelDOM.addNewStep()
			const stepInput = stepContainer.querySelector("input")
			stepInput.focus()

			checkIconEventListeners(stepContainer)
		}

		if (taskDetailsContainer) {
			const itemType = taskDetailsContainer.dataset.itemType
			const detailsContainer = taskDetailsContainer.querySelector(".task-details-info-container")
			const isContainerSelected = detailsContainer.classList.contains("selected")
			const iconClose = taskDetailsContainer.querySelector(".fa-xmark")

			if (isContainerSelected && e.target !== iconClose) return
			if (itemType === "important") taskPanelDOM.isTaskImportant(!isContainerSelected)
			if (itemType === "due-date") taskPanelDOM.hasTaskDueDate(!isContainerSelected)
			if (itemType === "attach-file") taskPanelDOM.file(!isContainerSelected)

			// TODO --> REVISAR CÓMO PASAR EL NOMBRE DEL PROYECTO. QUIZÁ SÓLO SEA QUITAR O AÑADIR.
			if (itemType === "project-name") taskPanelDOM.project(!isContainerSelected)
		}

		if (btnSave) {
			const taskIndexFromCardSelected = document.querySelector("[card-selected]").dataset.index
			const taskProperties = getTaskPropertiesFromTaskPanel()

			taskList[taskIndexFromCardSelected] = taskProperties

			const taskListFromProject = getTasksFromProject(projectName)
			updateTaskList(taskListFromProject)

			taskPanel.remove()
		}

		if (btnDelete) {
			const taskIndex = selectedCard.dataset.index
			taskList.splice(taskIndex, 1)
			const taskListFromProject = getTasksFromProject(projectName)
			updateTaskList(taskListFromProject)
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
	const allCheckedIcons = parentElement.querySelectorAll(".fa-square-check")
	const allNotCheckedIcons = parentElement.querySelectorAll(".fa-square")

	;[...allCheckedIcons, ...allNotCheckedIcons].forEach((icon) => {
		;["mouseover", "mouseout"].forEach((event) => {
			icon.addEventListener(event, () => {
				toggleClasses(icon, "fa-square", "fa-square-check")
			})
		})

		icon.addEventListener("click", () => {
			toggleClasses(icon, "fa-solid", "fa-regular", "fa-square-check", "fa-square")
		})
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

function getTaskPropertiesFromTaskPanel() {
	const taskPanel = document.getElementById("task-panel")
	const taskTitle = taskPanel.querySelector(".task-panel-title-container > input")
	const importanceContainer = taskPanel.querySelector(`[data-item-type="important"] > div`)
	const dueDateContainer = taskPanel.querySelector(`[data-item-type="due-date"] > div`)
	const projectContainer = taskPanel.querySelector(`[data-item-type="project-name"] > div`)
	const fileContainer = taskPanel.querySelector(`[data-item-type="attach-file"] > div`)
	const noteContainer = taskPanel.querySelector("#add-note-field")
	const allSteps = document.querySelectorAll(".task-step-container")

	const title = taskTitle.value
	const isCompleted = taskTitle.classList.contains("task-done")
	const isImportant = importanceContainer.classList.contains("selected")
	const dueDate = dueDateContainer.classList.contains("selected") ? "Hoy" : ""
	const project = projectContainer.classList.contains("selected") ? projectContainer.querySelector(`p`).textContent : ""
	const isFileAttached = fileContainer.classList.contains("selected")
	const note = noteContainer.value
	const steps = []

	allSteps.forEach((step) => {
		const isCompleted = step.querySelector("input").classList.contains("task-done")
		const stepName = step.querySelector("input").value

		steps.push({ isCompleted, stepName })
	})

	const taskProperties = { title, steps, isCompleted, isImportant, dueDate, project, isFileAttached, note }

	return taskProperties
}
