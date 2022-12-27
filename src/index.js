import "./styles.css"
import { DOMSkeleton } from ".//modules/DOM.js"
import { allTasks } from "./modules/task.js"

const init = (() => {
	const DOM = DOMSkeleton()

	allTasks.forEach((task) => {
		console.log(task.title)

		DOM.taskContainer(task.title, task.priority, task.project)
	})
})()
