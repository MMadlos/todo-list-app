import LogoTasks from "../icons/tasks.png"

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
		play: ["fa-regular", "fa-circle-play"],
		bookmark: ["fa-solid", "fa-bookmark"],
		close: ["fa-solid", "fa-xmark"],
		folder: ["fa-regular", "fa-folder-open"],
		clip: ["fa-solid", "fa-paperclip"],
		chevronRight: ["fa-solid", "fa-chevron-right"],
		chevronDown: ["fa-solid", "fa-chevron-down"],
		check: ["fa-regular", "fa-square-check"],
		checkEmpty: ["fa-regular", "fa-square"],
		checkDone: ["fa-solid", "fa-square-check"],
	}

	const _icon = document.createElement("i")
	_icon.classList.add(..._classes[iconName], size)
	return _icon
}
