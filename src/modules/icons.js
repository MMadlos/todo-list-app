import LogoTasks from "../icons/tasks.png"
import IconNotChecked from "../icons/not-checked.svg"
import IconCheckedDefault from "../icons/Checked-selected.svg"
import IconCheckedBorderBlue from "../icons/Checked-border-highlighted.svg"
import IconCheckedNotSelected from "../icons/Checked-not-selected.svg"
import IconPriority from "../icons/priority.svg"
import IconCalendar from "../icons/calendar.svg"
import IconFolder from "../icons/folder.svg"
import IconChevronRight from "../icons/chevron-right.svg"
import IconChevronDown from "../icons/chevron-down.svg"
import IconChevronLeft from "../icons/chevron-left.svg"
import IconAttach from "../icons/attach.svg"
import IconAdd from "../icons/add.svg"

export function Logo() {
	const _logo = new Image()
	_logo.id = "logo"
	_logo.src = LogoTasks

	return _logo
}

// ICONS - FONTAWESOME - Classes

export function IconGenerator(iconName = "bookmark", size) {
	if (iconName === "") iconName = "bookmark"

	const _classes = {
		clock: ["fa-regular", "fa-clock"],
		add: ["fa-solid", "fa-plus"],
		list: ["fa-solid", "fa-list"],
		star: ["fa-regular", "fa-star"],
		check: ["fa-regular", "fa-square-check"],
		play: ["fa-regular", "fa-circle-play"],
		bookmark: ["fa-solid", "fa-bookmark"],
		close: ["fa-solid", "fa-xmark"],
		folder: ["fa-regular", "fa-folder-open"],
		clip: ["fa-solid", "fa-paperclip"],
		chevronRight: ["fa-solid", "fa-chevron-right"],
		chevronDown: ["fa-solid", "fa-chevron-down"],
	}

	const _icon = document.createElement("i")
	_icon.classList.add(..._classes[iconName], size)
	return _icon
}

// Tick icon
export default function tickIcon(state) {
	const properties = {
		default: IconNotChecked,
		defaultHover: IconCheckedDefault,
		completedDefault: IconCheckedNotSelected,
		completedHover: IconCheckedBorderBlue,
	}

	const icon = SVG(properties[state])
	icon.classList.add("task-icon")

	return icon
}

// Label icons
function labelIcon(iconType, taskStatus) {
	const svgProperties = {
		hasNotPriority: IconPriority,
		hasPriority: IconPriority,
		calendar: IconCalendar,
		folder: IconFolder,
	}

	const svg = SVG(svgProperties[iconType])

	window.addEventListener("load", () => {
		const path = svg.contentDocument.querySelectorAll("path")

		if (taskStatus === "notCompleted" && iconType === "hasPriority") {
			path.forEach((element) => {
				element.setAttribute("fill", "#c")
			})
		}

		if (taskStatus === "completed" && iconType !== "calendar") {
			path.forEach((element) => {
				element.setAttribute("fill", "#c6ddec")
			})
		}

		if (taskStatus === "completed" && iconType === "calendar") {
			path.forEach((element) => {
				element.setAttribute("stroke", "#c6ddec")
				element.setAttribute("fill", "#fcfcfc")
			})
		}
	})

	return svg
}

export function Label(iconType, taskStatus) {
	const label = document.createElement("div")
	label.className = "label"
	label.classList.add(iconType)

	const text = document.createElement("p")
	text.textContent = "Default Text"
	text.className = "label-text"

	const svg = labelIcon(iconType, taskStatus)
	if (iconType === "hasPriority") {
		label.classList.add("has-priority")
	}

	if (taskStatus === "completed") {
		label.classList.add("completed")
	}

	label.appendChild(svg)
	label.appendChild(text)

	//TODO --> Falta si el label es de una tarea completada (azul claro)

	return label
}
