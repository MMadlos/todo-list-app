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

export function createButton() {
	const _btn = document.createElement("button")
	let _icon
	const _text = document.createElement("p")

	// Nuevo proyecto
	function addProject() {
		_btn.className = "btn-solid-blue"
		_btn.id = "btn-add-project"

		_icon = IconGenerator("add", "size-16")
		_text.textContent = "Nuevo proyecto"

		_btn.append(_icon, _text)
		return _btn
	}

	// Añadir tarea

	// Agregar paso
	function addStep() {
		_btn.className = "btn-add-step"
		_btn.id = "btn-add-step"

		_icon = IconGenerator("add", "size-16")
		_text.textContent = "Agregar paso"

		_btn.append(_icon, _text)

		return _btn
	}
	// Guardar
	// Eliminar

	return { addProject, addStep }
}
