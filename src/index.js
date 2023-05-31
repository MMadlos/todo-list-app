import "./styles.css"
import { newUI, taskCardUI, taskPanelComponent } from ".//modules/DOM"
import { taskList } from "./modules/task.js"

newUI()
const taskCardArray = []
const cardListContainer = document.querySelector(".task-card-list-container")

displayTaskList()

function displayTaskList() {
	taskList.forEach((task) => {
		const taskCard = taskCardUI()
		const taskCardDOM = taskCard.display()
		cardListContainer.append(taskCardDOM)

		taskCardArray.push(taskCard)

		const taskTitle = task.title
		const isCompleted = task.isCompleted
		const isImportant = task.isImportant
		const dueDate = task.dueDate
		const hasDueDate = task.dueDate !== ""
		const projectName = task.project
		const hasProject = task.project !== ""
		const hasFileAttached = task.isFileAttached

		taskCard.title(taskTitle)
		taskCard.tickIcon(isCompleted)
		taskCard.iconImportant(isImportant)

		taskCard.chipInfo(hasDueDate, "date", dueDate)
		taskCard.chipInfo(hasProject, "project", projectName)
		taskCard.chipInfo(hasFileAttached, "file")
		taskCard.chipsSeparator()

		const taskIndex = taskList.indexOf(task)
		taskCardDOM.dataset.index = taskIndex
	})

	cardEventListeners()
}

function cardEventListeners() {
	const allCards = cardListContainer.querySelectorAll(".task-card-container")
	allCards.forEach((card) => {
		// Hover effect
		const tickIcon = card.querySelector(".task-info-container > i")
		;["mouseover", "mouseout"].forEach((event) => {
			tickIcon.addEventListener(event, () => {
				tickIcon.classList.toggle("fa-square")
				tickIcon.classList.toggle("fa-square-check")
			})
		})

		let cardIndex
		card.onmouseenter = () => {
			cardIndex = card.dataset.index
		}

		// Event listeners
		card.addEventListener("click", (e) => {
			const taskFromList = taskList[cardIndex]

			const taskPanel = document.getElementById("task-panel")
			const isTaskPanelOpened = taskPanel ? true : false
			const isCardSelected = card.hasAttribute("card-selected")

			const clickedElement = e.target
			const isTickIcon = clickedElement == tickIcon
			const isStarIcon = clickedElement.classList.contains("fa-star")

			if (!isCardSelected && !isStarIcon && !isTickIcon) {
				allCards.forEach((card) => {
					card.removeAttribute("card-selected")
				})

				card.setAttribute("card-selected", "")
			}

			if (isTickIcon) {
				const isTaskCompleted = taskFromList.isCompleted
				// isTaskCompleted ? (taskFromList.isCompleted = false) : (taskFromList.isCompleted = true)

				taskFromList.isCompleted = isTaskCompleted ? false : true

				tickIcon.classList.toggle("fa-solid")
				tickIcon.classList.toggle("fa-regular")
				tickIcon.classList.toggle("fa-square-check")
				tickIcon.classList.toggle("fa-square")
				tickIcon.nextElementSibling.querySelector("p").classList.toggle("task-done")

				isCardSelected ?? updateTaskPanel()
			}

			if (isStarIcon) {
				const isTaskImportant = taskFromList.isImportant

				// isTaskImportant ? (taskFromList.isImportant = false) : (taskFromList.isImportant = true)

				taskFromList.isImprotant = isTaskImportant ? false : true

				const starIcon = card.querySelector(".fa-star")
				starIcon.classList.toggle("fa-solid")
				starIcon.classList.toggle("fa-regular")
				starIcon.classList.toggle("is-important")

				isCardSelected ?? updateTaskPanel()
			}

			if (!isTaskPanelOpened) openTaskPanel()
			if (isTaskPanelOpened && !isCardSelected) updateTaskPanel()
		})
	})
}

// TASK-PANEL
function openTaskPanel() {
	const taskPanelDOM = taskPanelComponent()
	taskPanelDOM.display()

	const cardSelected = document.querySelector("[card-selected]")
	const indexCard = cardSelected.dataset.index

	const taskFromList = taskList[indexCard]
	const isCompleted = taskFromList.isCompleted
	const taskTitle = taskFromList.title
	const taskSteps = taskFromList.steps
	const isImportant = taskFromList.isImportant
	const dueDate = taskFromList.dueDate
	const projectName = taskFromList.project
	const isFileAttached = taskFromList.isFileAttached
	const taskNote = taskFromList.note

	taskPanelDOM.tickIcon(isCompleted)
	taskPanelDOM.taskTitle(taskTitle)
	taskPanelDOM.taskStepsList(taskSteps)
	taskPanelDOM.isTaskImportant(isImportant)
	taskPanelDOM.hasTaskDueDate(dueDate)
	taskPanelDOM.project(projectName)
	taskPanelDOM.file(isFileAttached)
	taskPanelDOM.note(taskNote)

	taskPanelEventListeners()
}

function updateTaskPanel() {
	const taskPanel = document.getElementById("task-panel")
	taskPanel.remove()

	openTaskPanel()
}

function taskPanelEventListeners() {
	const taskPanel = document.getElementById("task-panel")

	// CHECK ICON --> Hover effect
	const tickIcon = taskPanel.querySelector(".task-panel-title-container > i")
	;["mouseover", "mouseout"].forEach((event) => {
		tickIcon.addEventListener(event, () => {
			tickIcon.classList.toggle("fa-square")
			tickIcon.classList.toggle("fa-square-check")
		})
	})

	// 3 grupos de funcionalidades:
	// --> 1 Eventos propios del task panel
	// --> 2 Vincularlos al DOM de la lista de tareaes (ej: al desmarcar vencimiento, tiene que desaparecer el vencimiento de la tarjeta en la lista de tareas)
	// --> 3 Guardar las propiedades añadidas en el task panel a la tarea de la taskList
	// Decisión: Sólo se actualizará la lista de tareas al pulsar en "Guardar"

	// TASK DETAILS - IMPORTANT | DUE DATE | PROJECT ASIGNED | ATTACH FILE
	const taskItemContainerAll = taskPanel.querySelectorAll(".task-details-item-container")
	taskItemContainerAll.forEach((itemContainer) => {
		itemContainer.addEventListener("click", (e) => {
			// Recojo tipo de elemento (importante | Vencimiento | Proyecto | Archivo adjunto)
			const itemType = itemContainer.dataset.itemType

			// Si es importante o vencimiento, si no está marcado, se marca al hacer click en el contenedor. Si está marcado, sólo se desmarca al hacer click en el icono de cerrar.
			if (itemType === "important" || itemType === "due-date" || itemType === "attach-file") {
				const iconClose = itemContainer.querySelector(".fa-xmark")
				const isIconCloseHidden = iconClose.classList.contains("hide") ? true : false

				if (!isIconCloseHidden && e.target !== iconClose) return

				const text = itemContainer.querySelector("p")

				if (itemType === "important") {
					const _icon = itemContainer.querySelector(".fa-star")
					_icon.classList.toggle("is-important", "fa-solid")
					_icon.classList.toggle("fa-solid")
					_icon.classList.toggle("fa-regular")

					text.textContent = isIconCloseHidden ? "Marcado como importante" : "Marcar como importante"
				}

				if (itemType === "due-date") text.textContent = isIconCloseHidden ? `Vence el "xxxx"` : "Añadir vencimiento"
				if (itemType === "attach-file") text.textContent = isIconCloseHidden ? `Archivo adjunto` : "Adjuntar archivo"

				iconClose.classList.toggle("hide")
				itemContainer.querySelector(".task-details-info-container").classList.toggle("selected")
			}

			const iconChevron = itemContainer.querySelector(".fa-chevron-down")
			if (e.target === iconChevron) {
				console.log("CHEVRON")
				// TODO --> Cuando no haya un proyecto seleccionado, el Chevron apunta a la derecha. Al hacer click, despliega la lista de proyectos.
				// TODO --> Cuando hay un proyecto seleccionado y se hace click en Chevron, se despliega la lista de proyectos
			}
		})
	})

	// Bubbling elements
	const taskTitle = taskPanel.querySelector(".task-panel-title-container > input")
	taskPanel.addEventListener("click", (e) => {
		if (e.target === tickIcon) {
			tickIcon.classList.toggle("fa-solid")
			tickIcon.classList.toggle("fa-regular")
			tickIcon.classList.toggle("fa-square-check")
			tickIcon.classList.toggle("fa-square")

			taskTitle.classList.toggle("task-done")
		}

		const tickIconSteps = taskPanel.querySelectorAll(".task-step-container > i")
		tickIconSteps.forEach((tick) => {
			if (e.target === tick || e.target === tick.nextElementSibling) {
				console.log("Funciona")

				tick.classList.toggle("fa-solid")
				tick.classList.toggle("fa-regular")
				tick.classList.toggle("fa-square-check")
				tick.classList.toggle("fa-square")

				tick.nextElementSibling.classList.toggle("task-done")
			}
		})

		// Save
		// -> Guardar las nuevas propiedades
		// -> Cambiarlas en la tarea de taskList
		// -> Actualizar la lista de tareas que se muestra en pantalla

		// Cuando haga click, guardo el valor del título
		const btnSave = document.getElementById("btn-save")
		if (e.target === btnSave || e.target === btnSave.querySelector("p")) {
			// Datos que quiero guardar
			/*
			const _getTaskPropertiesFromForm = {
				title: "",
				steps: [],
				isCompleted: false,
				isImportant: false,
				dueDate: "",
				project: "",
				isFileAttached: false,
				note: "",
			}
			*/

			// Tick icon
			const _isTaskCompleted = taskPanel.querySelector(".task-panel-title-container > i").classList.contains("task-done")

			// Title
			const _title = taskTitle.value
			console.log({ _isTaskCompleted, _title })

			// Steps

			// Importance
			// Due date
			// Project
			// Attached
			// Note
		}

		// Delete

		//Close task panel
		const btnClose = document.getElementById("btn-close-panel")
		if (e.target === btnClose) {
			const cardSelected = document.querySelector("[card-selected]")
			cardSelected.toggleAttribute("card-selected")

			taskPanel.remove()
		}
	})
}
