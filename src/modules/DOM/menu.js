import { Logo, IconGenerator, createButton } from "../icons"
import { el } from "../DOM"
import { projectList } from "../task"

export function menuUI() {
	const menuSection = el("section")
	const menuContainer = el("div")

	const header = headerUI()

	const projectListDefault = el("div")
	projectListDefault.className = "project-list-container"
	projectListDefault.setAttribute("default-projects", "")

	const projectListCustom = el("div")
	projectListCustom.className = "project-list-container"
	projectListCustom.setAttribute("custom-projects", "")
	const projectSeparator = el("p")

	const btnAddProject = createButton("addProject")

	menuSection.id = "menu"
	menuContainer.className = "menu-container"

	projectSeparator.textContent = "Proyectos"
	projectSeparator.className = "project-list-separator"

	menuSection.append(menuContainer, btnAddProject)
	menuContainer.append(header, projectListDefault, projectListCustom)
	projectListCustom.append(projectSeparator)

	const defaultProjects = projectList.slice(0, 4)
	const customProjects = projectList.slice(4)

	defaultProjects.forEach((projectName) => {
		const project = projectItem(projectName)
		projectListDefault.append(project)

		if (projectName === "Planificado") project.classList.add("selected")
	})

	customProjects.forEach((projectName) => {
		const project = projectItem(projectName)
		projectListCustom.append(project)
	})

	const display = () => {
		const content = document.getElementById("content")
		content.prepend(menuSection)
	}

	const addNewProject = (projectName) => {
		const currentProjectSelected = menuContainer.querySelector(".selected")
		currentProjectSelected.classList.remove("selected")

		const project = projectItem(projectName)
		project.classList.add("selected")
		projectListCustom.append(project)
	}

	return { display, addNewProject }
}

function headerUI() {
	const appNameContainer = el("div")
	const logo = Logo()
	const appName = el("h1")

	appName.id = "app-name"
	appName.textContent = "Mis tareas"
	appNameContainer.className = "title-container"
	appNameContainer.append(logo, appName)

	return appNameContainer
}

function projectItem(projectName) {
	const projectItemContainer = el("div")
	const titleContainer = el("div")

	const iconsForProjects = {
		Planificado: "clock",
		Todos: "list",
		Importantes: "star",
		Completados: "check",
		Tutorial: "play",
	}

	const iconName = iconsForProjects[projectName] ?? "bookmark"
	const icon = IconGenerator(iconName, "size-16")

	const projectTitle = el("p")
	const counterContainer = el("div")
	const counterText = el("p")

	projectItemContainer.setAttribute("project", projectName.toLowerCase())
	projectItemContainer.className = "project-item-container"
	titleContainer.className = "project-item-title-container"
	projectTitle.textContent = projectName
	counterContainer.className = "project-item-counter-container"

	counterContainer.appendChild(counterText)
	titleContainer.append(icon, projectTitle)
	projectItemContainer.append(titleContainer, counterContainer)

	return projectItemContainer
}
