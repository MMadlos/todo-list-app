import { Logo, IconGenerator, createButton } from "../icons"
import { el } from "../DOM"

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

const iconsForProjects = {
	Planificado: "clock",
	Todos: "list",
	Importantes: "star",
	Completados: "check",
	Tutorial: "play",
	"Nombre por defecto": "bookmark",
}

function projectItem(projectName) {
	const projectItemContainer = el("div")
	const titleContainer = el("div")
	const icon = IconGenerator(iconsForProjects[projectName], "size-16")
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

function defaultProjectListComponent() {
	const projectListDefault = el("div")
	projectListDefault.className = "project-list-container"

	const projectNames = ["Planificado", "Todos", "Importantes", "Completados"]

	projectNames.forEach((project) => {
		const _project = projectItem(project)
		projectListDefault.appendChild(_project)
	})

	return projectListDefault
}

export function menuComponent() {
	const menuSection = el("section")
	const menuContainer = el("div")

	const header = headerUI()

	const projectListDefault = defaultProjectListComponent()
	const projectListCustom = el("div")
	const projectSeparator = el("p")

	const btnAddProject = createButton("addProject")

	menuSection.id = "menu"
	menuContainer.className = "menu-container"

	projectListCustom.className = "project-list-container"
	projectSeparator.textContent = "Proyectos"
	projectSeparator.className = "project-list-separator"

	projectListCustom.append(projectSeparator)
	menuContainer.append(header, projectListDefault, projectListCustom)
	menuSection.append(menuContainer, btnAddProject)

	const display = () => menuSection

	function addProjectItem(projectName = "Nombre por defecto") {
		const project = projectItem(projectName)
		projectListCustom.append(project)
	}

	return { display, addProjectItem }
}
