import { IconGenerator } from "../icons"
const el = (element) => document.createElement(element)
const content = document.getElementById("content")

// LAYOUT
const mainSection = el("main")
const mainSectionContainer = el("div")
mainSection.id = "main-section"
mainSectionContainer.className = "main-section-container"

// HEADER
const projectNameContainer = el("div")
const projectName = el("input")

const projectIcon = IconGenerator("clock", "size-24")

projectNameContainer.className = "project-name-container"
projectName.className = "project-name"

projectNameContainer.append(projectIcon, projectName)
mainSectionContainer.appendChild(projectNameContainer)

// TASK LIST
const taskCardListContainer = el("div")
taskCardListContainer.className = "task-card-list-container"

mainSectionContainer.append(taskCardListContainer)

// NEW BTN
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

export const mainDOM = {
	display: () => content.append(mainSection),
	setHeader: () => {
		const projectSelectedFromNav = document.querySelector(".selected")
		const projectNameFromNav = projectSelectedFromNav.querySelector("p").textContent
		const projectIconFromNav = projectSelectedFromNav.querySelector("i")

		projectName.value = projectNameFromNav
		projectName.placeholder = projectNameFromNav
		projectIcon.classList = projectIconFromNav.classList
		projectIcon.classList.remove("size-16")
		projectIcon.classList.add("size-24")

		const defaultProjectList = document.querySelectorAll("[default-projects] > li")
		const isProjectFromDefaultList = Object.values(defaultProjectList).includes(projectSelectedFromNav)
		if (!isProjectFromDefaultList) projectName.disabled = false
		if (isProjectFromDefaultList) projectName.disabled = true
	},
	toggleTaskBtnTo: (state) => {
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
	},
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

	taskCardContainer.prepend(taskInfoContainer)
	taskInfoContainer.append(taskTitleContainer)
	taskTitleContainer.append(taskTitle, taskDetailsContainer)

	const checkIcon = el("i")
	checkIcon.className = "size-21"
	taskInfoContainer.prepend(checkIcon)

	const starIcon = el("i")
	starIcon.classList.add("size-21")
	starIcon.classList.add("fa-star")
	taskCardContainer.appendChild(starIcon)

	const display = () => taskCardListContainer.appendChild(taskCardContainer)

	const setCheckIcon = (isTaskCompleted) => {
		checkIcon.classList.toggle("fa-solid", isTaskCompleted)
		checkIcon.classList.toggle("fa-square-check", isTaskCompleted)
		checkIcon.classList.toggle("fa-regular", !isTaskCompleted)
		checkIcon.classList.toggle("fa-square", !isTaskCompleted)
		taskTitle.classList.toggle("task-done", isTaskCompleted)
	}

	const title = (title) => (taskTitle.textContent = title)

	const setStarIcon = (isTaskImportant) => {
		starIcon.classList.toggle("fa-solid", isTaskImportant)
		starIcon.classList.toggle("is-important", isTaskImportant)
		starIcon.classList.toggle("fa-regular", !isTaskImportant)
	}

	const addTag = (propertyFromTask) => {
		const propertyName = Object.keys(propertyFromTask)
		const propertyText = Object.values(propertyFromTask)[0]

		const icons = {
			dueDate: "clock",
			project: "folder",
			isFileAttached: "clip",
		}

		const tagContainer = el("div")
		const tagIcon = IconGenerator(icons[propertyName], "size-16")
		const tagText = el("p")

		tagContainer.className = "detail-container"
		tagText.textContent = propertyText === true ? "Archivo adjunto" : propertyText

		tagContainer.append(tagIcon, tagText)
		taskDetailsContainer.appendChild(tagContainer)
	}

	const addTagDividers = () => {
		const detailContainers = taskDetailsContainer.querySelectorAll(".detail-container")
		const countTags = detailContainers.length

		if (countTags === 0) taskDetailsContainer.remove()
		if (countTags > 1) {
			for (let i = 0; i < countTags - 1; i++) {
				const tagDivider = el("div")
				tagDivider.className = "task-details-separator"

				detailContainers[i].after(tagDivider)
			}
		}
	}

	const addTaskIndex = (taskIndex) => (taskCardContainer.dataset.index = taskIndex)

	return { display, title, setCheckIcon, setStarIcon, addTag, addTagDividers, addTaskIndex }
}
