import { Logo, IconGenerator, createButton, iconsForProjects } from "../icons"
import { projectList, taskList } from "../task"
export const menuDOM = { display, addNewProject, refreshTaskCounter }

const el = (element) => document.createElement(element)
const content = document.getElementById("content")

// LAYOUT
const menuSection = el("section")
const menuContainer = el("div")

menuSection.id = "menu"
menuContainer.className = "menu-container"

// Header
const header = el("div")
const logo = Logo()
const appName = el("h1")

appName.id = "app-name"
appName.textContent = "Mis tareas"
header.className = "title-container"
header.append(logo, appName)

// Project Lists layout
const projectListDefault = el("div")
projectListDefault.className = "project-list-container"
projectListDefault.setAttribute("default-projects", "")

const projectListCustom = el("div")
projectListCustom.className = "project-list-container"
projectListCustom.setAttribute("custom-projects", "")

const projectSeparator = el("p")
projectSeparator.textContent = "Proyectos"
projectSeparator.className = "project-list-separator"

const btnAddProject = createButton("addProject")

menuSection.append(menuContainer, btnAddProject)
menuContainer.append(header, projectListDefault, projectListCustom)
projectListCustom.append(projectSeparator)

// DOM MANIPULATION
function display() {
	const defaultProjects = projectList.slice(0, 4)
	const customProjects = projectList.slice(4)

	defaultProjects.forEach((projectName) => {
		const project = projectItem(projectName)
		projectListDefault.append(project)
	})

	customProjects.forEach((projectName) => {
		const project = projectItem(projectName)
		projectListCustom.append(project)

		if (projectName === "Tutorial") project.classList.add("selected")
	})
	content.prepend(menuSection)
}

function addNewProject(projectName) {
	const currentProjectSelected = menuContainer.querySelector(".selected")
	currentProjectSelected.classList.remove("selected")

	const project = projectItem(projectName)
	project.classList.add("selected")
	projectListCustom.append(project)
}

function projectItem(projectName) {
	const projectItemContainer = el("div")
	const titleContainer = el("div")

	const icon = IconGenerator(iconsForProjects[projectName] ?? "bookmark", "size-16")
	const projectTitle = el("p")
	const counterContainer = el("div")
	const counterText = el("p")

	projectItemContainer.setAttribute("project", projectName)
	projectItemContainer.className = "project-item-container"
	titleContainer.className = "project-item-title-container"
	projectTitle.textContent = projectName
	counterContainer.className = "project-item-counter-container"
	counterText.textContent = getTasksFromProject(projectName).length
	console.log({ projectName, counterText })

	counterContainer.appendChild(counterText)
	titleContainer.append(icon, projectTitle)
	projectItemContainer.append(titleContainer, counterContainer)

	return projectItemContainer
}

function getTasksFromProject(projectName) {
	const propertyNames = {
		Planificado: "dueDate",
		Importantes: "isImportant",
		Completados: "isCompleted",
	}
	const propertyToFilter = propertyNames[projectName]

	if (projectName === "Todos") return taskList

	const tasksProject = taskList.filter((task) => {
		if (projectName === "Planificado") return task[propertyToFilter] !== ""
		if (propertyToFilter === undefined) return task.project === projectName

		return task[propertyToFilter]
	})

	return tasksProject
}

function refreshTaskCounter() {
	const allProjectItems = document.querySelectorAll("[project]")
	allProjectItems.forEach((project) => {
		const projectName = project.querySelector("p").textContent
		const numberOfTasks = getTasksFromProject(projectName).length

		const counterElement = project.querySelector("div:last-of-type > p")
		counterElement.textContent = numberOfTasks
	})
}
