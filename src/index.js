import "./styles.css"
import { taskPanelDOM } from "./modules/DOM/taskPanel"
import { navDOM } from "./modules/DOM/nav"
import { mainDOM, taskCardUI } from "./modules/DOM/mainSection"
import { projectList, taskList, createTask, getTasksFromProject } from "./modules/task.js"

const defaultTaskList = getTasksFromProject("Tutorial")

//Init app:
displayMenu()
displayMainSection()

function displayMenu() {
	navDOM.display()
	menuEventListeners()
}

function displayMainSection() {
	mainDOM.display()
	renderTaskList()
	mainDOM.setHeader()
	projectNameEventListeners()
	cardEventListeners()
	btnAddTaskEventListeners()
}

// MENU
function menuEventListeners() {
	const nav = document.querySelector("#nav")

	nav.addEventListener("click", (e) => {
		const currentProjectSelected = nav.querySelector(".selected")

		const projectContainer = e.target.closest(".project-item-container")
		const btnAddProject = e.target.closest("#btn-add-project")

		if (!projectContainer && !btnAddProject) return
		if (projectContainer === currentProjectSelected) return

		let projectName
		if (projectContainer) {
			currentProjectSelected.classList.remove("selected")
			projectContainer.classList.add("selected")

			projectName = projectContainer.querySelector("p").textContent

			mainDOM.setHeader()
			const projectTasks = getTasksFromProject(projectName)
			updateTaskList(projectTasks)
		}

		if (btnAddProject) {
			projectName = "Nombre por defecto"
			const isNameDuplicated = projectList.includes(projectName)

			if (isNameDuplicated) {
				const filterDuplicated = projectList.filter((project) => project.includes(projectName))
				const countDuplicated = filterDuplicated.length

				projectName = `${projectName} (${countDuplicated})`
			}

			projectList.push(projectName)
			navDOM.addNewProject(projectName)

			mainDOM.setHeader()
			const projectTasks = getTasksFromProject(projectName)
			updateTaskList(projectTasks)

			// Focus input to change title name
			const inputProjectName = document.querySelector("input.project-name")
			inputProjectName.value = ""
			inputProjectName.focus()
		}

		// mainDOM.setHeader()
		// const projectTasks = getTasksFromProject(projectName)
		// updateTaskList(projectTasks)
	})
}

// |-- MAIN PANEL -->
function projectNameEventListeners() {
	const mainSection = document.getElementById("main-section")
	const projectName = mainSection.querySelector(".project-name")

	;["mouseenter", "mouseout"].forEach((event) => {
		projectName.addEventListener(event, () => {
			if (document.activeElement !== projectName) projectName.classList.toggle("edit", event === "mouseenter")
		})
	})

	let wasTitleClicked = false
	mainSection.addEventListener("click", (e) => {
		if (projectName.disabled) return

		const targetProjectName = e.target.closest(".project-name")
		if (!targetProjectName && !wasTitleClicked) return
		if (!targetProjectName && wasTitleClicked) return editProjectTitle()

		projectName.classList.add("edit")
		projectName.value = ""
		wasTitleClicked = true
	})

	projectName.addEventListener("keydown", (e) => {
		if (e.key === "Enter") editProjectTitle()
	})

	function editProjectTitle() {
		const navProjectSelected = document.querySelector(".selected")
		const navProjectName = navProjectSelected.querySelector("p").textContent

		const isTitleEdited = navProjectName !== projectName.value ? true : false
		if (!isTitleEdited) return

		const isDuplicatedName = projectList.some((project) => project === projectName.value)
		if (isDuplicatedName) {
			alert("Ya hay un proyecto con el mismo nombre. Por favor, cambia el título.")
			projectName.value = ""
			projectName.focus()
			return
		}

		if (!isDuplicatedName) {
			if (projectName.value === "") projectName.value = projectName.placeholder
			projectName.classList.remove("edit")
			projectName.placeholder = projectName.value
			projectName.blur()

			navDOM.editProjectNameSelected(projectName.value)

			const projectTaskList = getTasksFromProject(navProjectName)
			projectTaskList.forEach((task) => (task.project = projectName.value))

			const indexToReplace = projectList.indexOf(navProjectName)
			projectList[indexToReplace] = projectName.value

			updateTaskList(projectTaskList)

			wasTitleClicked = false
		}
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

				navDOM.refreshTaskCounter()
				return
			}

			if (starIcon) {
				toggleClasses(starIcon, "fa-solid", "fa-regular", "is-important")
				taskFromList.isImportant = !taskFromList.isImportant

				navDOM.refreshTaskCounter()
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

function updateTaskList(sortedTaskList) {
	removeTaskList()
	renderTaskList(sortedTaskList)
	cardEventListeners()
}

function btnAddTaskEventListeners() {
	const content = document.querySelector("#content")
	const nav = document.querySelector("#nav")
	const mainSection = document.querySelector("#main-section")

	const addTaskElement = document.querySelector(".new-task-input-container")
	const inputElement = mainSection.querySelector("#new-task")

	content.addEventListener("click", (e) => {
		const addTaskState = addTaskElement.getAttribute("state")

		const isBtnActive = addTaskState === "active"
		const isBtnClicked = e.target.closest(".new-task-input-container")

		if (isBtnClicked && !isBtnActive) {
			mainDOM.toggleTaskBtnTo("active")
			inputElement.focus()
		}

		if (!isBtnClicked && isBtnActive) {
			if (inputElement.value) return
			if (!inputElement.value) mainDOM.toggleTaskBtnTo("inactive")
		}
	})

	addTaskElement.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return

		const newTaskTitle = inputElement.value
		const projectSelected = nav.querySelector(".selected").querySelector("p").textContent

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

// let taskPanelDOM
function renderTaskPanel() {
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
	const nav = document.getElementById("nav")
	nav.addEventListener("click", (e) => {
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
		const projectName = projectSelected.querySelector(".project-name-container > p").textContent

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
			taskPanelDOM.remove()
		}
	})
}

function openTaskPanel() {
	renderTaskPanel()
	taskPanelEventListeners()
}

function updateTaskPanel() {
	taskPanelDOM.remove()
	openTaskPanel()
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
