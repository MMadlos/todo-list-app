import { Logo, IconGenerator, createButton } from "../icons"
import { el } from "../DOM"
import { projectList } from "../task"

export function menuComponent() {
	const UI = menuUI()

	function addProjectList(group) {
		const defaultProjectListContainer = document.querySelector("[default-projects")
		const customProjectListContainer = document.querySelector("[custom-projects")

		const defaultProjects = projectList.slice(0, 4)
		const customProjects = projectList.slice(4)

		if (group === "default") {
			defaultProjects.forEach((project) => {
				const _project = projectItem(project)
				defaultProjectListContainer.append(_project)
			})
		}

		if (group === "custom") {
			customProjects.forEach((project) => {
				const _project = projectItem(project)
				customProjectListContainer.append(_project)
			})
		}
	}

	return { UI, addProjectList }
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

function menuUI() {
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

	projectListCustom.append(projectSeparator)
	menuContainer.append(header, projectListDefault, projectListCustom)
	menuSection.append(menuContainer, btnAddProject)

	return menuSection
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
