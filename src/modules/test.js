const test = () => {
	console.log("HOLA")
	const content = document.getElementById("content")
	const title = document.createElement("H1")
	title.classList.add("header")
	title.textContent = "HOLA"
	content.appendChild(title)
	return content
}

export { test }
