import { Logo, IconGenerator, createButton, iconsForProjects } from "../icons"
import { projectList, taskList } from "../task"

const el = (element) => document.createElement(element)
const content = document.getElementById("content")

// LAYOUT
const nav = el("nav")
const navContainer = el("div")

nav.id = "nav"
navContainer.className = "nav-container"

// Header
const header = el("header")
const logo = Logo()
const appName = el("h1")

appName.id = "app-name"
appName.textContent = "Mis tareas"
header.className = "title-container"
header.append(logo, appName)

// Project Lists layout
const projectListDefault = el("ul")
projectListDefault.className = "project-list"
projectListDefault.setAttribute("default-projects", "")

const projectListCustom = el("ul")
projectListCustom.className = "project-list"
projectListCustom.setAttribute("custom-projects", "")

const projectSeparator = el("p")
projectSeparator.textContent = "Proyectos"
projectSeparator.className = "project-list-separator"

const btnAddProject = createButton("addProject")

nav.append(navContainer, btnAddProject)
navContainer.append(header, projectListDefault, projectListCustom)
projectListCustom.append(projectSeparator)

// DOM MANIPULATION
export const navDOM = {
	display: () => {
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
		content.prepend(nav)
	},
	addNewProject: () => {
		const currentProjectSelected = navContainer.querySelector(".selected")
		currentProjectSelected.classList.remove("selected")

		const project = projectItem(projectName)
		project.classList.add("selected")
		projectListCustom.append(project)
	},
	refreshTaskCounter: () => {
		const allProjectItems = document.querySelectorAll("[project]")
		allProjectItems.forEach((project) => {
			const projectName = project.querySelector("p").textContent
			const numberOfTasks = getTasksFromProject(projectName).length

			const counterElement = project.querySelector(".task-counter")
			counterElement.textContent = numberOfTasks
		})
	},
	editProjectNameSelected: (newProjectName) => {
		const selectedProjectContainer = nav.querySelector(".selected")
		const selectedProjectName = selectedProjectContainer.querySelector("p")
		selectedProjectName.textContent = newProjectName
	},
}

function projectItem(projectName) {
	const projectItemContainer = el("li")
	const titleContainer = el("div")

	const icon = IconGenerator(iconsForProjects[projectName] ?? "bookmark", "size-16")
	const projectTitle = el("p")
	const counterText = el("p")

	projectItemContainer.setAttribute("project", projectName)
	projectItemContainer.className = "project-item-container"
	titleContainer.className = "project-name-container"
	projectTitle.textContent = projectName
	counterText.className = "task-counter"
	counterText.textContent = getTasksFromProject(projectName).length

	titleContainer.append(icon, projectTitle)
	projectItemContainer.append(titleContainer, counterText)

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
