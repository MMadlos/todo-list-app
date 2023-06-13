import { el } from "../DOM"
import { IconGenerator } from "../icons"

export function mainUI() {
	const mainSection = el("main")
	const mainSectionContainer = el("div")
	mainSection.id = "main-section"
	mainSectionContainer.className = "main-section-container"

	// HEADER
	const headerContainer = el("div")
	const projectIcon = IconGenerator("clock", "size-24")
	const titleContainer = el("div")
	const titleText = el("p")

	headerContainer.className = "header-container"
	titleContainer.className = "title-container"
	titleText.textContent = "Planificado"

	function editHeader() {
		const projectSelected = document.querySelector(".selected")
		const projectTitle = projectSelected.querySelector("p").textContent
		const _projectIcon = projectSelected.querySelector("i")

		titleText.textContent = projectTitle
		projectIcon.classList = _projectIcon.classList
		projectIcon.classList.remove("size-16")
		projectIcon.classList.add("size-24")
	}

	titleContainer.appendChild(titleText)
	headerContainer.append(projectIcon, titleContainer)
	mainSectionContainer.appendChild(headerContainer)

	// TASK LIST (Group + cards)
	const taskListContainer = el("div")
	const taskGroupContainer = el("div")

	taskListContainer.className = "task-list-container"
	taskGroupContainer.className = "task-group-container"

	// -> Group Name elements
	const taskGroupNameContainer = el("div")
	const iconChevronDown = IconGenerator("chevronDown", "size-12")
	const groupName = el("p")
	const groupCounterContainer = el("div")
	const counterText = el("p")

	taskGroupNameContainer.className = "task-group-name-container"
	groupName.textContent = "Hoy"
	groupCounterContainer.className = "group-counter-container"
	counterText.textContent = "2"

	taskGroupNameContainer.append(iconChevronDown, groupName, groupCounterContainer)
	groupCounterContainer.appendChild(counterText)

	// -> Cards
	const taskCardListContainer = el("div")
	taskCardListContainer.className = "task-card-list-container"

	taskListContainer.appendChild(taskGroupContainer)
	taskGroupContainer.append(taskGroupNameContainer, taskCardListContainer)
	mainSectionContainer.append(taskListContainer)

	// NEW BTN
	// const inputAddTask = newTaskBtn()
	const newTaskInputContainer = el("div")
	newTaskInputContainer.className = "new-task-input-container"
	newTaskInputContainer.setAttribute("state", "inactive")

	const newTaskTaskContainer = el("div")
	newTaskTaskContainer.className = "new-task-task-container"

	const newTaskInputIcon = IconGenerator("add", "size-24")
	const newTaskInput = el("input")
	newTaskInput.type = "text"
	newTaskInput.id = "new-task"
	newTaskInput.name = "new-task"
	newTaskInput.placeholder = "Añadir tarea"

	const newTaskIconsContainer = el("div")
	newTaskIconsContainer.className = "new-task-icons-container"
	newTaskIconsContainer.classList.toggle("hide")

	const dueDateIcon = IconGenerator("clock", "size-21")
	const projectFolderIcon = IconGenerator("folder", "size-21")
	const starIcon = IconGenerator("star", "size-21")

	newTaskIconsContainer.append(dueDateIcon, projectFolderIcon, starIcon)
	newTaskTaskContainer.append(newTaskInputIcon, newTaskInput)
	newTaskInputContainer.append(newTaskTaskContainer, newTaskIconsContainer)

	mainSection.append(mainSectionContainer, newTaskInputContainer)

	const display = () => {
		const content = document.getElementById("content")
		content.append(mainSection)
	}

	function toggleTaskBtnTo(state) {
		if (state === "active") {
			newTaskInputContainer.setAttribute("state", "active")

			newTaskInputIcon.className = ""
			newTaskInputIcon.classList.add("fa-regular", "fa-square", "size-24")

			newTaskInput.placeholder = ""
		}
		if (state === "inactive") {
			newTaskInputContainer.setAttribute("state", "inactive")

			newTaskInputIcon.className = ""
			newTaskInputIcon.classList.add("fa-solid", "fa-plus", "size-24")

			newTaskInput.placeholder = "Añadir tarea"
		}
	}

	return { display, editHeader, toggleTaskBtnTo }
}

export function taskCardUI() {
	const taskCardContainer = el("div")
	const taskInfoContainer = el("div")
	const taskTitleContainer = el("div")
	const taskTitle = el("p")
	const taskDetailsContainer = el("div")

	taskCardContainer.className = "task-card-container"
	taskInfoContainer.className = "task-info-container"
	taskTitleContainer.className = "task-title-container"
	taskDetailsContainer.className = "task-details-container"

	taskTitle.textContent = "Título por defecto"

	taskCardContainer.prepend(taskInfoContainer)
	taskInfoContainer.append(taskTitleContainer)
	taskTitleContainer.append(taskTitle, taskDetailsContainer)

	const display = () => {
		const taskListContainer = document.querySelector(".task-card-list-container")
		return taskListContainer.appendChild(taskCardContainer)
	}

	function tickIcon(isTaskCompleted) {
		const tickIcon = isTaskCompleted ? IconGenerator("checkDone", "size-21") : IconGenerator("checkEmpty", "size-21")

		if (isTaskCompleted) taskTitle.classList.add("task-done")

		return taskInfoContainer.prepend(tickIcon)
	}

	function title(title) {
		return (taskTitle.textContent = title)
	}

	function iconImportant(isTaskImportant) {
		const _icon = isTaskImportant ? IconGenerator("starSolid", "size-21") : IconGenerator("star", "size-21")
		return taskCardContainer.appendChild(_icon)
	}

	function addTag(type, taskText) {
		if (!taskText) return

		const tagContainer = el("div")
		tagContainer.className = "detail-container"

		const iconName = {
			date: "clock",
			project: "folder",
			file: "clip",
		}

		const tagIcon = IconGenerator(iconName[type], "size-16")
		const tagText = el("p")
		tagText.textContent = taskText === true ? "Archivo adjunto" : taskText

		tagContainer.append(tagIcon, tagText)
		taskDetailsContainer.appendChild(tagContainer)
	}

	function tagSeparator() {
		const detailContainers = taskDetailsContainer.querySelectorAll(".detail-container")
		const countTags = detailContainers.length

		if (countTags === 0) taskDetailsContainer.remove()
		if (countTags > 1) {
			for (let i = 0; i < countTags - 1; i++) {
				const separator = el("div")
				separator.className = "task-details-separator"

				detailContainers[i].after(separator)
			}
		}
	}

	return { display, title, tickIcon, iconImportant, addTag, tagSeparator }
}
