import "./styles.css"
// import { test } from "./modules/test.js"
import { allTasks, createTask } from "./modules/task.js"
import { init, btnAddTask, addNewTask, printNewTask } from ".//modules/DOM.js"

// Default tasks
const firstTask = createTask("Primera tarea")
const secondTask = createTask("Segunda tarea", true)
const thirdTask = createTask("Tercera tarea")

init()
printNewTask(firstTask.title)
printNewTask(secondTask.title)
printNewTask(thirdTask.title)

const getBtnAddTask = document.getElementById("btnAddTask")
getBtnAddTask.addEventListener("click", () => {
	printNewTask(addNewTask())
})

console.log(btnAddTask())
console.dir(btnAddTask())
console.table(allTasks)
console.log(firstTask)

// allTasks.forEach((element) => {
// 	console.log("Task title: " + element.title)
// 	DOM().addTask(element.title)
// })
