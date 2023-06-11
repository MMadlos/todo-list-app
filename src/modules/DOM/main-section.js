import { el } from "../DOM"
import { IconGenerator, createButton } from "../icons"

export function mainSectionComponent() {
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

	// BTN
	const btnAddTask = createButton("addTask")
	mainSection.append(mainSectionContainer, btnAddTask)

	return mainSection
}
