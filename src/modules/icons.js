import LogoTasks from "../icons/tasks.png"

export function Logo() {
	const _logo = new Image()
	_logo.id = "logo"
	_logo.src = LogoTasks

	return _logo
}

// ICONS - FONTAWESOME - Classes
const iconList = {
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

export function IconGenerator(iconName, size) {
	const defaultIcon = iconList["bookmark"]
	const _iconClasses = iconList[iconName] || defaultIcon

	const _icon = document.createElement("i")
	_icon.classList.add(..._iconClasses, size)

	return _icon
}

export function createButton(buttonName) {
	//Button properties
	const addProject = {
		class: "btn-solid-blue",
		id: "btn-add-project",
		icon: ["add", "size-16"],
		text: "Nuevo proyecto",
	}

	const deleteProject = {
		class: "btn-underlined-red",
		id: "btn-delete",
		icon: false,
		text: "Eliminar",
	}

	const saveTask = {
		class: "btn-solid-blue",
		id: "btn-save",
		icon: false,
		text: "Guardar",
	}

	const addStep = {
		class: "btn-add-step",
		id: "btn-add-step",
		icon: ["add", "size-16"],
		text: "Agregar paso",
	}

	// Button display
	const _btn = document.createElement("button")
	const _text = document.createElement("p")

	const _btnName = eval(buttonName)
	_btn.className = _btnName["class"]
	_btn.id = _btnName["id"]
	_text.textContent = _btnName["text"]

	if (!_btnName["icon"]) {
		_btn.append(_text)
		return _btn
	}

	const _icon = IconGenerator(..._btnName["icon"])
	_btn.append(_icon, _text)

	return _btn
}
